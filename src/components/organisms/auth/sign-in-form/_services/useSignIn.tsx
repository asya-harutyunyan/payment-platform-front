import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { login_schema } from "@/schema/login.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetRoleData } from "@/store/reducers/authSlice";
import {
  enableTwoFAThunk,
  fetchUser,
  getUserRoleThunk,
  loginUser,
} from "@/store/reducers/authSlice/thunks";
import { twoFASchema } from "@/store/reducers/authSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof login_schema>;

export enum EUserRole {
  Admin = "admin",
  Client = "client",
  SuperAdmin = "superAdmin",
}

const INITIAL_PATHS_WITH_ROLES = {
  [EUserRole.Admin]: "/welcome",
  [EUserRole.SuperAdmin]: "/user-list",
  [EUserRole.Client]: "/my-information",
};

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [isTwoFAModalOpen, setIsTwoFAModalOpen] = useState(false);

  const getUserRoleData = useAppSelector((state) => state.auth.getUserRoleData);

  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(login_schema),
    defaultValues: { email: "", password: "" },
  });

  const handleAuthError = useCallback(
    (error: unknown) => {
      const parsedError = twoFASchema.safeParse(error);

      if (parsedError.success) {
        setIsTwoFAModalOpen(true);
        return;
      }

      const typedError = error as {
        message: string;
        errors: Record<string, Array<string>> | string;
      };

      if (
        typedError.errors &&
        typedError.message !== "Ваша почта не подтверждена"
      ) {
        Object.entries(typedError.errors).forEach(([field, messages]) => {
          // for make red email field
          if (messages === " ") {
            setError("email", { type: "manual", message: " " });
          }

          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof FormData, {
              type: "manual",
              message: messages[0],
            });
          }
        });
      }
      if (
        typedError.message ===
        "Ваш аккаунт заблокирован. Пожалуйста, свяжитесь со службой поддержки."
      ) {
        enqueueSnackbar(
          "Ваш аккаунт заблокирован. Пожалуйста, свяжитесь со службой поддержки.",
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      }
    },
    [setError]
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!getUserRoleData) {
      try {
        const response = await dispatch(
          getUserRoleThunk({ email: data.email, password: data.password })
        ).unwrap();

        if (response.role === EUserRole.Admin && !response.google2fa_enabled) {
          await dispatch(loginUser(data)).unwrap();
        }

        if (response.role !== EUserRole.SuperAdmin) {
          return;
        }
      } catch (error) {
        handleAuthError(error);
      }
    }

    if (
      getUserRoleData?.role === EUserRole.Admin &&
      !getUserRoleData.google2fa_enabled
    ) {
      if (!data.otp || data.otp.length === 0) {
        setError("otp", {
          type: "manual",
          message: "Authorization key required!",
        });
        return;
      }

      if (data.otp.length < 6) {
        setError("otp", {
          type: "manual",
          message: "Invalid authorization key!",
        });
        return;
      }

      await dispatch(enableTwoFAThunk({ otp: data.otp })).unwrap();
    }

    try {
      await dispatch(loginUser(data)).unwrap();

      const userData = await dispatch(fetchUser()).unwrap();

      if (userData.user) {
        const { role } = userData.user;

        setUser({ ...userData.user, permissions: userData.permissions });

        localStorage.setItem("user_role", role ?? "");

        navigate({
          to: INITIAL_PATHS_WITH_ROLES[role] ?? INITIAL_PATHS_WITH_ROLES.client,
        });
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleEmailOrPasswordChange = useCallback(() => {
    dispatch(resetRoleData());
  }, [dispatch]);

  return {
    handleSubmit,
    control,
    onSubmit,
    getUserRoleData,
    isTwoFAModalOpen,
    setIsTwoFAModalOpen,
    handleEmailOrPasswordChange,
  };
};

export default useSignIn;

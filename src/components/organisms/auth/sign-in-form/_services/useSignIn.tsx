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
import {
  recaptchaErrorSchema,
  twoFASchema,
} from "@/store/reducers/authSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof login_schema>;

export const showRecaptchaError = () => {
  enqueueSnackbar("Не удачная попытка попробуйте по позже!", {
    variant: "error",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};

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

  const { control, handleSubmit, setError, setValue } = useForm<FormData>({
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

      const recaptchaParsedError = recaptchaErrorSchema.safeParse(error);

      if (recaptchaParsedError.success) {
        showRecaptchaError();
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

  const handleRecaptchaVerify = (token: string) => {
    setValue("recaptcha_token", token);
    handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let userData = getUserRoleData;
    if (!userData) {
      try {
        userData = await dispatch(
          getUserRoleThunk({ email: data.email, password: data.password })
        ).unwrap();

        if (userData.role === EUserRole.Admin && !userData.google2fa_enabled) {
          await dispatch(loginUser(data)).unwrap();
          setIsTwoFAModalOpen(true);
          return;
        }

        if (userData.role === EUserRole.Client) {
          return;
        }
      } catch (error) {
        handleAuthError(error);
        return;
      }
    }

    if (userData.role === EUserRole.Admin && !userData.google2fa_enabled) {
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

    if (userData.role === EUserRole.Client && !data.recaptcha_token) {
      return;
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

  const handleModalClose = useCallback(() => setIsTwoFAModalOpen(false), []);

  return {
    handleSubmit,
    control,
    onSubmit,
    getUserRoleData,
    isTwoFAModalOpen,
    handleEmailOrPasswordChange,
    handleModalClose,
    handleRecaptchaVerify,
  };
};

export default useSignIn;

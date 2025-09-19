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
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof login_schema>;

export enum EUserRole {
  Admin = "admin",
  Client = "client",
  SuperAdmin = "superAdmin",

  SupportLead = "support_lead",
  SupportOperator = "support_operator",
  SupportTrainee = "support_trainee",
  TechnicalSpecialist = "technical_specialist",
}

export const ADMIN_ROLES = [
  EUserRole.Admin,
  EUserRole.SupportLead,
  EUserRole.SupportOperator,
  EUserRole.SupportTrainee,
  EUserRole.TechnicalSpecialist,
] as const;

const INITIAL_PATHS_WITH_ROLES = {
  [EUserRole.SuperAdmin]: "/user-list",
  [EUserRole.Client]: "/my-information",
  ...ADMIN_ROLES.reduce(
    (prevValue, currentValue) => {
      prevValue[currentValue] = "/welcome";
      return prevValue;
    },
    {} as Record<
      Exclude<EUserRole, EUserRole.SuperAdmin | EUserRole.Client>,
      string
    >
  ),
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
        enqueueSnackbar(recaptchaParsedError.data.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
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

        if (
          userData.role !== EUserRole.SuperAdmin &&
          userData.role !== EUserRole.Client &&
          !userData.google2fa_enabled
        ) {
          await dispatch(loginUser(data)).unwrap();
          setIsTwoFAModalOpen(true);
          return;
        }

        if (userData.role === EUserRole.Client) {
          return;
        }
      } catch (error) {
        handleAuthError(error);
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        return;
      }
    }

    if (
      userData.role !== EUserRole.SuperAdmin &&
      userData.role !== EUserRole.Client &&
      !userData.google2fa_enabled
    ) {
      if (!data.otp || data.otp.length === 0) {
        setError("otp", {
          type: "manual",
          message: t("authorization_key_required"),
        });
        return;
      }

      if (data.otp.length < 6) {
        setError("otp", {
          type: "manual",
          message: t("invalid-authorization-key"),
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

  const handleModalClose = useCallback(() => {
    setIsTwoFAModalOpen(false);
    dispatch(resetRoleData());
  }, [dispatch]);

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

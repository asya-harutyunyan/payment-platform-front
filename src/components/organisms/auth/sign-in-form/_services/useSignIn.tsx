import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { login_schema } from "@/schema/login.schema";
import { useAppDispatch } from "@/store";
import {
  enableTwoFAThunk,
  fetchUser,
  loginUser,
} from "@/store/reducers/authSlice/thunks";
import { twoFASchema } from "@/store/reducers/authSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { FocusEventHandler, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof login_schema>;

export enum EUserRole {
  Admin = "admin",
  User = "user",
  SuperAdmin = "superAdmin",
}

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [currentUserRole, setUserCurrentRole] = useState<EUserRole | null>(
    null
  );
  const [isTwoFAModalOpen, setIsTwoFAModalOpen] = useState(false);

  const { control, handleSubmit, register, setError } = useForm<FormData>({
    resolver: zodResolver(login_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onEmailBlur = useCallback<
    FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(async () => {
    try {
      // const a = await dispatch(
      //   getUserRoleThunk({ email: e.target.value })
      // ).unwrap();
      const receivedRole = EUserRole.Admin;

      setUserCurrentRole(receivedRole);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.otp) {
      await dispatch(enableTwoFAThunk({ otp: data.otp })).unwrap();
    }

    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        dispatch(fetchUser())
          .unwrap()
          .then((data) => {
            if (data.user) {
              const { role } = data.user;

              setUser({
                ...data.user,
                permissions: data.permissions,
              });

              localStorage.setItem("user_role", role ?? "");

              if (role === "admin") {
                navigate({
                  to: "/welcome",
                });
              } else if (role === "superAdmin") {
                navigate({ to: "/user-list" });
              } else {
                navigate({ to: "/my-information" });
              }
            }
          });
      })
      .catch((error) => {
        const parsedError = twoFASchema.safeParse(error);

        if (parsedError.success) {
          setIsTwoFAModalOpen(true);
          return;
        }

        if (error.errors && error.message !== "Ваша почта не подтверждена") {
          Object.entries(error.errors).forEach(([field, messages]) => {
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
          error.message ===
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
      });
  };

  return {
    handleSubmit,
    register,
    control,
    onSubmit,
    setUser,
    navigate,
    onEmailBlur,
    currentUserRole,
    isTwoFAModalOpen,
    setIsTwoFAModalOpen,
  };
};

export default useSignIn;

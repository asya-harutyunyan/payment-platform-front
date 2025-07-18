import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { comfirm_email_schema } from "@/schema/comfirm_email.schema";
import { useAppDispatch } from "@/store";
import { confirmEmail, fetchUser } from "@/store/reducers/authSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADMIN_ROLES } from "../../sign-in-form/_services/useSignIn";

type FormData = z.infer<typeof comfirm_email_schema>;

const useConfirmEmail = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(comfirm_email_schema),
    defaultValues: {
      two_factor_code: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(confirmEmail(data))
      .unwrap()
      .then((response) => {
        if (response.token) {
          localStorage.setItem("accessToken", response.token);
          dispatch(fetchUser())
            .unwrap()
            .then((data) => {
              if (data.user.id) {
                setUser(data.user);
                localStorage.setItem("user_role", data.user.role ?? "");
                navigate({
                  to:
                    ADMIN_ROLES.includes(
                      data.user.role as (typeof ADMIN_ROLES)[number]
                    ) || data.user.role === "superAdmin"
                      ? "/user-list"
                      : "/wallet",
                });
              }
            });
        }
      })
      .catch((error) => {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof FormData, {
                type: "manual",
                message: messages[0],
              });
            }
          });
        } else {
          console.warn("Неизвестный формат ошибки:", error);
        }
      });
  };
  return {
    handleSubmit,
    control,
    onSubmit,
  };
};

export default useConfirmEmail;

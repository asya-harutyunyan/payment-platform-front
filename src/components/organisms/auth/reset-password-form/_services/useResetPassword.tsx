import { z } from "@/common/validation";
import { reset_schema } from "@/schema/change_password.schema";
import { useAppDispatch } from "@/store";
import { setEmail } from "@/store/reducers/authSlice";
import { resetPassword } from "@/store/reducers/authSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

export type ResetPasswordschema = z.infer<typeof reset_schema>;

const useResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm<ResetPasswordschema>({
    resolver: zodResolver(reset_schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordschema> = async (data) => {
    dispatch(setEmail(data.email));

    dispatch(resetPassword(data))
      .unwrap()
      .then(() => {
        navigate({ to: "/auth/change-password" });
      })
      .catch((error) => {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof ResetPasswordschema, {
                type: "manual",
                message: messages[0],
              });
            }
          });
        } else {
          console.warn("Неизвестный формат ошибки:", error);
        }
        console.error("Registration failed:", error);
      });
  };
  return {
    handleSubmit,
    onSubmit,
    control,
  };
};

export default useResetPassword;

import { z } from "@/common/validation";
import { change_password_schema } from "@/schema/change_password.schema";
import { RootState, useAppDispatch } from "@/store";
import { setEmail } from "@/store/reducers/authSlice";
import { changePassword } from "@/store/reducers/authSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type ConfirmEmailFormData = z.infer<typeof change_password_schema>;
const useChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.email);

  const { control, handleSubmit, register, setError } =
    useForm<ConfirmEmailFormData>({
      resolver: zodResolver(change_password_schema),
      defaultValues: {
        email: email,
        two_factor_code: "",
        password: "",
        password_confirmation: "",
      },
    });

  const onSubmit: SubmitHandler<ConfirmEmailFormData> = async (data) => {
    dispatch(changePassword(data))
      .then(() => {
        navigate({ to: "/auth/sign-in" });
        setEmail("");
      })
      .catch((error) => {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof ConfirmEmailFormData, {
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
    register,
  };
};

export default useChangePassword;

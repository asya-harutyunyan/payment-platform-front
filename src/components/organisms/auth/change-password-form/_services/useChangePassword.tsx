import { z } from "@/common/validation";
import { change_password_schema } from "@/schema/change_password.schema";
import { setEmail } from "@/store/reducers/auth/authSlice";
import { changePassword } from "@/store/reducers/auth/authSlice/thunks";
import { RootState, useAppDispatch } from "@/store/reducers/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type ConfirmEmailFormData = z.infer<typeof change_password_schema>;
const useChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.email);

  const { control, handleSubmit, register } = useForm<ConfirmEmailFormData>({
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
      .then((response) => {
        if (!response) {
          navigate({ to: "/auth/sign-in" });
        }
        setEmail("");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
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

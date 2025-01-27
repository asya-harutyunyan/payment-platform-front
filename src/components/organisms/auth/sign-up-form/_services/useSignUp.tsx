import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { auth_schema } from "@/schema/sign_up.schema";
import { registerUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof auth_schema>;

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { control, handleSubmit, watch, register, setError } =
    useForm<FormData>({
      resolver: zodResolver(auth_schema),
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        password_confirmation: "",
        checkbox: false,
      },
    });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then((response) => {
        if (response.status === 200 && response.data.token) {
          setIsAuthenticated(true);
        }
        navigate({ to: "/auth/confirm-email" });

        console.log("Registration successful, token:", response.token);
      })
      .catch((error) => {
        if (typeof error === "string") {
          setError("email", {
            type: "manual",
            message: error,
          });
          setError("password", {
            type: "manual",
            message: error,
          });
        }
        console.error("Registration failed:", error);
      });
  };

  return {
    control,
    handleSubmit,
    watch,
    register,
    onSubmit,
    navigate,
  };
};
export default useSignUp;

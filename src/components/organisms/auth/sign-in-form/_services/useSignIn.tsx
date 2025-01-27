import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { login_schema } from "@/schema/login.schema";
import { fetchUser, loginUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof login_schema>;

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, register, setError } = useForm<FormData>({
    resolver: zodResolver(login_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((response) => {
        console.log("Registration successful, token:", response);
        dispatch(fetchUser())
          .unwrap()
          .then((data) => {
            if (data.id) {
              setUser(data);
              localStorage.setItem("user_role", data.role ?? "");
              navigate({
                to: data.role === "admin" ? "/task-list" : "/user-task-list",
              });
            }
          });
      })
      .catch((error) => {
        if (typeof error === "string") {
          setError("email", {
            type: "manual", // Specify the type of error
            message: error, // Error message to display
          });
          setError("password", {
            type: "manual", // Specify the type of error
            message: error,
          });
        }

        console.error("Sign in failed:", error);
      });
  };
  return {
    handleSubmit,
    register,
    control,
    onSubmit,
    setUser,
    navigate,
  };
};

export default useSignIn;

import { useAuth } from "@/context/auth.context";
import { login_schema } from "@/schema/login.schema";
import { fetchUser, loginUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

type FormData = z.infer<typeof login_schema>;

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(login_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);

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
        console.error("Registration failed:", error);
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

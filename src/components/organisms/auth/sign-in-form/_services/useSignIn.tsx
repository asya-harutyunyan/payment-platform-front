import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { login_schema } from "@/schema/login.schema";
import { useAppDispatch } from "@/store";
import { fetchUser, loginUser } from "@/store/reducers/auth/authSlice/thunks";
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
      .then(() => {
        dispatch(fetchUser())
          .unwrap()
          .then((data) => {
            if (data.id) {
              setUser(data);
              localStorage.setItem("user_role", data.role ?? "");
              navigate({
                to: data.role === "admin" ? "/user-list" : "/my-information",
              });
            }
          });
      })
      .catch((error) => {
        console.log(error);

        if (error.errors && error.message !== "Ваша почта не подтверждена") {
          Object.entries(error.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof FormData, {
                type: "manual",
                message: messages[0],
              });
            }
          });
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
  };
};

export default useSignIn;

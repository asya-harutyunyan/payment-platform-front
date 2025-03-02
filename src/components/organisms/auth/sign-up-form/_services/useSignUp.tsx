import { z } from "@/common/validation";
import { auth_schema } from "@/schema/sign_up.schema";
import { useAppDispatch } from "@/store";
import { registerUser } from "@/store/reducers/auth/authSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof auth_schema>;

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        console.log(response);
        if (response.status === 201) {
          navigate({
            to: "/auth/confirm-email",
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
    control,
    handleSubmit,
    watch,
    register,
    onSubmit,
    navigate,
  };
};
export default useSignUp;

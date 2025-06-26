import { z } from "@/common/validation";
import { auth_schema } from "@/schema/sign_up.schema";
import { useAppDispatch } from "@/store";
import { registerUser } from "@/store/reducers/authSlice/thunks";
import { recaptchaErrorSchema } from "@/store/reducers/authSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { showRecaptchaError } from "../../sign-in-form/_services/useSignIn";

type FormData = z.infer<typeof auth_schema>;

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchParams = useSearch({
    from: "/_no_auth/auth/sign-up/",
  });
  const { control, handleSubmit, watch, setError, setValue } =
    useForm<FormData>({
      resolver: zodResolver(auth_schema),
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        referral_code:
          (searchParams as { referral_code?: string }).referral_code ?? "",
        password: "",
        password_confirmation: "",
        checkbox: false,
      },
    });

  const onRecaptchaVerify = (token: string) => {
    setValue("recaptcha_token", token);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then((response) => {
        if (response.status === 201) {
          navigate({
            to: "/auth/sign-in",
          });
        }
      })
      .catch((error) => {
        const tError = recaptchaErrorSchema.safeParse(error);

        if (tError.success) {
          showRecaptchaError();
        }

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
    onSubmit,
    navigate,
    onRecaptchaVerify,
  };
};
export default useSignUp;

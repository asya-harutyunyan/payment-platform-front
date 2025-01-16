import { login_schema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type TLoginType = z.infer<typeof login_schema>;
const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginType>({
    mode: "onSubmit",
    resolver: zodResolver(login_schema),
  });

  return {
    handleSubmit,
    errors,
    control,
  };
};

export default useLogin;

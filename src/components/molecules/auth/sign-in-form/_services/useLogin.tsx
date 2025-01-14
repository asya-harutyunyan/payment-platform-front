import { login_schema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type TLoginType = z.infer<typeof login_schema>;
const useLogin = () => {
  const [showWrongRole, setShowWrongRole] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginType>({
    mode: "onSubmit",

    resolver: zodResolver(login_schema),
  });

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleFormSubmit = async () => {};

  const handleRememberMe = () => setRememberMe(!rememberMe);

  return {
    handleSubmit,
    errors,
    control,
    handleFormSubmit,
    handleRememberMe,
    rememberMe,
    showWrongRole,
    setShowWrongRole,
  };
};

export default useLogin;

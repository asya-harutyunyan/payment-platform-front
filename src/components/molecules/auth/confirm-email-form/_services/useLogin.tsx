import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "../../../schema/login.schema";

type TLoginType = z.infer<typeof loginSchema>;
const useLogin = () => {
	const [showWrongRole, setShowWrongRole] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginType>({
		mode: "onSubmit",

		resolver: zodResolver(loginSchema),
	});

	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const handleFormSubmit = async () => {
	
	};

	const handleRememberMe = () => setRememberMe(!rememberMe);

	return {
		handleSubmit,
		errors,
		control,
		handleFormSubmit,
		handleRememberMe,
		rememberMe,
		showWrongRole,
		setShowWrongRole
	};
};

export default useLogin;

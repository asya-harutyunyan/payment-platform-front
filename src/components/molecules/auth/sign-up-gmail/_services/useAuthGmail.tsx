
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { socialAuthSchema } from "../../../../../schema/signUp.schema";
type TSocialAuthType = z.infer<typeof socialAuthSchema>;
type TCheckMarks = {
	agree: boolean;
	policy: boolean;
};

const useAuthGmail = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TSocialAuthType>({
		mode: "onSubmit",
		resolver: zodResolver(socialAuthSchema),
	});
	const [checkMarks, setCheckMarks] = useState<TCheckMarks>({
		agree: false,
		policy: false,
	});
	const handleFormSubmit: SubmitHandler<TSocialAuthType> = async (
	) => {
		
	};

	const handleCheck = (name: string, value: boolean) => {
		setCheckMarks((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleBack = () => {
		
	};
	return {
		control,
		handleSubmit,
		errors,
		checkMarks,
		handleFormSubmit,
		handleCheck,
		handleBack,
	};
};
export default useAuthGmail;

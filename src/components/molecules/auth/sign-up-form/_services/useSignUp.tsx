
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUpSchema } from "../../../../../schema/signUp.schema";

type TSignUpType = z.infer<typeof signUpSchema>;
type TCheckMarks = {
	agree: boolean;
	policy: boolean;
};

const useSignUp = () => {
	const [showWrongRole, setShowWrongRole] = useState<boolean>(false);
	const [tempRestricted, setTempRestricted] = useState<boolean>(false);
	const [isIpValidation, setIsIpValidation] = useState<boolean>(false);
	const [isUnknown, setIsUnknown] = useState<boolean>(false);
	const [proceedSignup, ] = useState();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TSignUpType>({
		mode: "onSubmit",
		resolver: zodResolver(signUpSchema),
	});
	const [checkMarks, setCheckMarks] = useState<TCheckMarks>({
		agree: false,
		policy: false,
	});

	const handleCheck = (name: string, value: boolean) => {
		setCheckMarks((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleFormSubmit: SubmitHandler<TSignUpType> = async (
	) => {
		
	};

	return {
		control,
		handleSubmit,
		errors,
		checkMarks,
		handleFormSubmit,
		handleCheck,
		isIpValidation,
		setIsIpValidation,
		setIsUnknown,
		isUnknown,
		proceedSignup,
		tempRestricted,
		setTempRestricted,
		showWrongRole,
		setShowWrongRole,
	};
};
export default useSignUp;

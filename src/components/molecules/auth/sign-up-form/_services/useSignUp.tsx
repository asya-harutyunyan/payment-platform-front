
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../schema/signUp.schema";

type TSignUpType = z.infer<typeof signUpSchema>;


const useSignUp = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TSignUpType>({
		mode: "onSubmit",
		resolver: zodResolver(signUpSchema),
	});


	return {
		control,
		handleSubmit,
		errors,
	};
};
export default useSignUp;

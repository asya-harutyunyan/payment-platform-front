
import * as z from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialAuthSchema } from "../../../schema/signUp.schema";


type TSocialAuthType = z.infer<typeof socialAuthSchema>;

const useAuthGmail = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TSocialAuthType>({
		mode: "onSubmit",
		resolver: zodResolver(socialAuthSchema),
	});

	return {
		control,
		handleSubmit,
		errors,

	};
};
export default useAuthGmail;

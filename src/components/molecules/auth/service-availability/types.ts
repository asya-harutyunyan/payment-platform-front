import { useStateType } from "@/models/global.model";

export type TServiceAvailability = {
	isIpValidation: boolean;
	setIsIpValidation: useStateType<boolean>;
};

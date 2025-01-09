import type { ChangeEvent } from "react";

export type TPhoneInput = {
	label?: string;
	name?: string;
	onChange?: (value: string) => void;
	isRequired?: boolean;
	disabled?: boolean;
	value?: string;
	hasDefaultCountryCode?: boolean;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	errorText?: string;
	placeholder?: string;
	absoluteValue?: string;
};

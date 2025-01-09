import {
	FieldErrors,
	FieldValues,
	UseFormSetError,
	UseFormTrigger,
} from "react-hook-form";

export type TUpdateAvatarPropTypes = {
	setOpenAvatarModal: (arg: boolean) => void;
	role?: "fr" | "em" | "company";
	companyId?: string;
	companyAvatar?: string;
};

export type TDraggerCropperRef = {
	onDelete: () => void;
	onOpenInput: () => void;
};
export type TuseUpdateAvatarTypes = {
	setOpenAvatarModal: (val: boolean) => void;
};
export interface FormHandlers {
	setError: UseFormSetError<FieldValues>;
	trigger: UseFormTrigger<FieldValues>;
	error: FieldErrors;
}

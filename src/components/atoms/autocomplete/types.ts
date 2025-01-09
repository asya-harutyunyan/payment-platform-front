import type { IconType } from "../icon";
import type { AutoCompleteProps } from "antd";

export interface IAutocomplete<T>
	extends Omit<
		AutoCompleteProps<string>,
		"options" | "onChange" | "onBlur" | "value"
	> {
	optionList: T[];
	optionLabelKey: keyof T;
	optionValueKey: keyof T;
	optionSecondLabelKey?: keyof T;
	optionIconKey?: keyof T;
	value: string | null | undefined;
	error?: boolean;
	errorText?: string;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	mainIcon?: IconType;
	isRequired?: boolean;
	isGiveAllItem?: boolean;
	onBlur?: () => void;
	isLoading?: boolean;
	listHeight?: number;

	onChange(value: T | string | number | null | undefined): void;
}

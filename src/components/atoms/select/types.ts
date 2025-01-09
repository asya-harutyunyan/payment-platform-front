import type { IconType } from "../icon";
import type { SelectProps } from "antd/lib/select";

export interface ISelect<T>
	extends Omit<
		SelectProps<string>,
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
	isDropdownWithInput?: boolean;
	dropDownInputPlaceholder?: string;
	dropDownInputButtonText?: string;
	dropDownInputLabel?: string;
	searchValue?: string;
	warningText?: string;
	darkMode?: boolean;
	purpleMode?: boolean;
	greyMode?: boolean;
	onChange(value: T | string | number | null | undefined): void;
}

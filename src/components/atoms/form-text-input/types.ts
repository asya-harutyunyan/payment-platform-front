import type { MouseEvent, ReactNode } from "react";
import type { InputProps } from "antd";
import {
	Control,
	FieldPath,
	FieldValues,
	UseControllerProps,
} from "react-hook-form";

export interface IFormTextInput<T extends FieldValues>
	extends UseControllerProps<T>,
		InputProps {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	defaultValue?: T[FieldPath<T>];
	suffix?: ReactNode;
	prefix?: ReactNode;
	onClickSuffixIcon?: () => void;
	onClickPrefixIcon?: () => void;
	isLoading?: boolean;
	inputType?: "text" | "number" | "password";
	maxLength?: number;
	required?: boolean;
	isOptional?: boolean;
	minLength?: number;
	readOnly?: boolean;
	size?: "small" | "middle" | "large" | undefined;
	warningText?: string;

	onClick?(data: MouseEvent<HTMLInputElement>): void;
}

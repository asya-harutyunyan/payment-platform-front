import type {
	ChangeEvent,
	KeyboardEventHandler,
	MouseEvent,
	ReactNode,
	Ref,
} from "react";
import type { InputProps, InputRef } from "antd";
import { IconType } from "@/components/atoms/icon";

export interface IInputPropTypes extends InputProps {
	labelIcon?: IconType;
	tooltipText?: string;
	tooltipTitle?: string;
	placeholder?: string;
	error?: boolean;
	errorText?: string;
	disabled?: boolean;
	inputType?: "text" | "number" | "password";
	label?: string;
	ref?: Ref<InputRef>;
	isRequired?: boolean;
	isOptional?: boolean;
	maxLength?: number;
	minLength?: number;
	readOnly?: boolean;
	size?: "small" | "middle" | "large" | undefined;
	suffix?: ReactNode;
	prefix?: ReactNode;
	warningText?: string;
	value?: string | number | undefined;
	name: string;
	darkMode?: boolean;
	purpleMode?: boolean;
	grayMode?: boolean;
	showArrows?: boolean;
	showArrowMaxValue?:number;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
	onClickSuffixIcon?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
	onClickPrefixIcon?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
	isLoading?: boolean;

	onBlur?(data: ChangeEvent<HTMLInputElement>): void;

	onFocus?(data: ChangeEvent<HTMLInputElement>): void;

	onChange?(data: ChangeEvent<HTMLInputElement>): void;

	onClick?(data: MouseEvent<HTMLInputElement>): void;
}

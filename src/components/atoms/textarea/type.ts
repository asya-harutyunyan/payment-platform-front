import type { ChangeEvent, Ref } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";
import { TextAreaProps } from "antd/lib/input";

export interface TTextareaProps extends Omit<TextAreaProps, "TextAreaProps"> {
	label?: string;
	minRows?: number;
	maxRows?: number;
	error?: boolean;
	errorText?: string;
	name: string;
	placeholder?: string;
	value?: string;
	ref?: Ref<TextAreaRef>;
	warningText?: string;
	autoSize?: boolean;

	onChange?(data: ChangeEvent<HTMLTextAreaElement>): void;
}

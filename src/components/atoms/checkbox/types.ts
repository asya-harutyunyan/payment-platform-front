import { type CheckboxChangeEvent } from "antd/lib/checkbox";
import { type CheckboxProps } from "antd";

export interface ICheckbox
	extends Omit<CheckboxProps, "checked" | "disabled" | "onChange" | "label"> {
	checked: boolean;
	onChange?: (e: CheckboxChangeEvent) => void;
	disabled?: boolean;
	label?: string;
	darkMode?: boolean;
}

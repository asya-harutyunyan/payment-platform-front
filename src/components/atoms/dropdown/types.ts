import type { IconType } from "../icon";
import type { MenuProps } from "antd";

export interface IDropDownPropTypes {
	text?: string;
	iconRight?: boolean;
	iconLeft?: IconType;
	items?: MenuProps["items"];
	variant: "button" | "icon";
	buttonVariant?:
		| "primary"
		| "secondary"
		| "default"
		| "white"
		| "purple"
		| "black";
	iconButton?: IconType;
	notOpenable?: boolean;
	without_padding?: boolean;
	onClick?: () => void;
	primary?: boolean;
	onlyIcon?: boolean;
	fontSize?: number;
	placement:
		| "bottom"
		| "bottomLeft"
		| "bottomRight"
		| "top"
		| "topLeft"
		| "topRight";
}

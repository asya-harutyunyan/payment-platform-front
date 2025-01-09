import type { IconType } from "../icon";
import type { CSSProperties } from "react";

export type TButton = {
	size: "large" | "middle" | "small";
	type?: "submit" | "reset" | "button";
	text: string;
	variant:
		| "primary"
		| "secondary"
		| "dashed"
		| "text"
		| "dashed_selected"
		| "dark_primary"
		| "dark_secondary";
	disabled?: boolean;
	width?: string;
	height?: string;
	icon?: IconType;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	style?: CSSProperties;
	className?: string;
	iconFill?: string;
	href?:string
};

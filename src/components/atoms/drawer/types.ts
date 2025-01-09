import { CSSProperties, ReactNode } from "react";

export interface IDrawerPropTypes {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	size?: "default" | "large";
	placement: "top" | "right" | "bottom" | "left";
	loading?: boolean;
	zIndex?: number;
	customHeaderComponent?: ReactNode;
	style?: CSSProperties;
	border?: "gray" | "accent";
	customBottomsheetTopColor?: string;
}

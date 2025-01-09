import type { ReactNode } from "react";
import type { IconType } from "@/components/atoms/icon";

export type TCollapseProps = {
	headerChild?: ReactNode;
	collapseType: "header" | "icon" | "disabled";
	bodyChild: ReactNode;
	isActive?: boolean;
	rowClick?: () => void;
	iconOpen?: IconType;
	leftIcon?: IconType;
	isNotCollapsable?: boolean;
	iconClick?: () => void;
	label: string;
	iconPosition?: "start" | "end";
	customIcon?: boolean;
};

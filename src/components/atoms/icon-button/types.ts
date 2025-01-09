import { IconType } from "@/components/atoms/icon";
import React, { CSSProperties } from "react";

export type TIconButton = {
	size: "large" | "middle" | "small";
	type?: "submit" | "reset" | "button";
	variant: "primary" | "secondary" | "danger" | "red-outlined";
	stroke?: string;
	fill?: string;
	disabled?: boolean;
	width?: string;
	height?: string;
	icon: IconType;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	style?: CSSProperties;
	iconType?: "stroke" | "fill";
	className?: string;
};

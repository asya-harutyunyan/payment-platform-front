import type { IconType } from "@/components/atoms/icon";

export interface MobileStaticToastPropTypes {
	title: string;
	body: string;
	type: "success" | "warning" | "error" | "info";
	handleShowNotification?: () => void;
	showNotification?: boolean;
	customIcon?: IconType;
}

import { IconType } from "../icon";

export type IBadgeTooltipPropTypes = {
	type: "standart" | "master-forms" | "language" | "standart-company";
	icon?: IconType;
	placement: "top" | "bottom" | "left" | "right";
	title: string;
	text?: string;
	languageLevel?: "Basic" | "Intermediate" | "Advanced" | "Native";
	isAllTooltip?: boolean;
};

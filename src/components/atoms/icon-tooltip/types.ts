import { IconType } from "../icon";
import type { SVGProps } from "react";

export type IIconTooltip = {
	icon: IconType;
	placement: "top" | "bottom" | "left" | "right";
	title: string;
	svgProps?: SVGProps<SVGSVGElement>;
};

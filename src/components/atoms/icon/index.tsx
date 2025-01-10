import * as icons from "@/assets";
import { type SVGProps, memo } from "react";

export type IconType = keyof typeof icons;

interface IIconProps {
	icon: IconType;
	svgProps?: SVGProps<SVGSVGElement>;
	fill?: string;
	width?: string;
	height?: string;
}

const Icon = memo((props: IIconProps) => {
	const { svgProps, icon, fill = "none" } = props;
	const xm = icons;
	const image: IconType | unknown = xm[icon];

	if (typeof image === "function") {
		return image({ ...svgProps, fill });
	}
	return image;
});

Icon.displayName = "Icon";

export default Icon;

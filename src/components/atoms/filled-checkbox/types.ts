import type { IconType } from "../icon";

export type TFilledChecbkox = {
	checked: boolean;
	onChange: (checked: boolean, key: string) => void;
	disabled?: boolean;
	label: string;
	name: string;
	icon?: IconType;
	variant: "primary" | "secondary" | "default" | "no_border";
	theme?: string;
	className?:string;
	no_active_bg?:boolean,
	fullWidth? :boolean
};

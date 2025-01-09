import type { IconType } from "@/components/atoms/icon";
import type { JSX } from "react";

export interface IMenuItem {
	key: string;
	label: string;
	hasSubMenu: boolean;
	icon: IconType;
	href?: string;
	identificator: string;
	isLocked: boolean;
	svgFill?: "g" | "path" | "path_fill";
}

export interface ISubMenuItem {
	key: string;
	label: string | JSX.Element;
	children?: ISubMenuItem[];
}

export interface IMenuItems {
	items: IMenuItem[];
	subs: {
		[key: string]: ISubMenuItem[];
	};
}

export interface ISelectedKeysEvent {
	domEvent: React.SyntheticEvent;
	key: string;
	keyPath: string[];
	item: unknown;
}
export interface ISideMenuPropTypes {
	isOnboardingCompleted: boolean;
	setIsOnboardingCompleted: (val: boolean) => void;
	mode?: number;
}

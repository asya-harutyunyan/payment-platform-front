import { ReactNode } from "react";

export interface IFullScreenModalPropTypes {
	isOpen: boolean;
	setIsOpen: () => void;
	children: ReactNode;
	isBottomSheet?: boolean;
	closable?: boolean;
}

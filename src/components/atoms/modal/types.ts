import type { CSSProperties, ReactNode } from "react";
import type { ModalProps } from "antd";

export interface IModal extends ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	style?: CSSProperties;
	bottomSheetOpenBreakpoint?: number;
	bottomSheetClassName?: string;
}


import React, { type FC, useEffect, useState } from "react";
import { Modal } from "antd";
import type { IModal } from "./types";
import { useMount } from "react-use";

const ModalComponent: FC<IModal> = ({
	isOpen,
	children,
	onClose,
	title,
	style,
	...rest
}) => {
	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(true));

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isOpen]);

	return (
		mounted && (
					<Modal
						centered={true}
						title={title}
						open={isOpen}
						onCancel={() => onClose()}
						okButtonProps={{ style: { display: "none" } }}
						cancelButtonProps={{ style: { display: "none" } }}
						{...rest}
						style={{
							...style,
							maxWidth: style?.maxWidth || "642px",
							zIndex: 999999999,
						}}
						width={"90%"}
					>
						{children}
					</Modal>
				
		)
	);
};

export default ModalComponent;

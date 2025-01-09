
import React, { FC, useEffect } from "react";
import { Drawer } from "antd";
import { IDrawerPropTypes } from "./types";
import styles from "./styles.module.scss";
import classNames from "classnames";

const DrawerComponent: FC<IDrawerPropTypes> = ({
	children,
	isOpen,
	onClose,
	title,
	placement,
	loading,
	customHeaderComponent,
	style,
	border,
}) => {

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

	const customHeader = (
		<div className={styles.customHeader}>
			<h2 className={styles.title}>{title}</h2>
			{customHeaderComponent ? (
				<div className={styles.customText}>{customHeaderComponent}</div>
			) : null}
		</div>
	);

	return (
					<Drawer
						className={classNames(
							styles.drawer,
							border === "gray" && styles.border_gray
						)}
						title={customHeader} // Set the custom header
						onClose={onClose}
						open={isOpen}
						placement={placement}
						loading={loading}
						maskClosable
						zIndex={900}
						style={style}
					>
						{children}
					</Drawer>
				
		)
};

export default DrawerComponent;

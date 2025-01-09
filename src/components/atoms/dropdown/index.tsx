
import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Dropdown } from "antd";
import Icon from "../icon";
import { IDropDownPropTypes } from "./types";
import classNames from "classnames";

const DropDownComponent: FC<IDropDownPropTypes> = ({
	text,
	variant,
	iconRight,
	iconLeft,
	iconButton,
	placement,
	items,
	notOpenable,
	without_padding,
	onClick,
	onlyIcon,
	buttonVariant,
	fontSize,
}) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<Dropdown
				menu={{ items }}
				placement={placement}
				open={notOpenable ? false : open}
				onOpenChange={() => setOpen(!open)}
				trigger={["click"]}
				getPopupContainer={() => document.body}
				className="ant-drop-down-component"
			>
				<button
					className={classNames(
						styles.dropdown_button,
						buttonVariant === "primary" && styles.primary,
						buttonVariant === "secondary" && styles.secondary,
						buttonVariant && styles[buttonVariant],
						variant === "icon" && styles.icon_button,
						without_padding && styles.without_padding,
						onlyIcon && styles.only_icon
					)}
					style={{ fontSize: fontSize ? `${fontSize}px` : "" }}
					onClick={(event) => {
						event.stopPropagation();
						onClick && onClick();
					}}
					type="button"
				>
					{iconLeft && <Icon icon={iconLeft} />}
					{variant === "button" && text}
					{variant === "icon" && iconButton && <Icon icon={iconButton} />}
					{iconRight && (
						<Icon icon={open ? "IconChevronTop" : "IconChevronBottom"} />
					)}
				</button>
			</Dropdown>
		</>
	);
};

export default DropDownComponent;

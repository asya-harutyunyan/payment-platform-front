
import styles from "./styles.module.scss";
import type { TIconButton } from "./types";
import { type FC } from "react";
import classNames from "classnames";
import { ButtonSpinner, Icon } from "@/components";
import type { IconType } from "@/components/atoms/icon";
import { Colors } from "@/constants";

const IconButtonComponent: FC<TIconButton> = ({
	size,
	type = "button",
	variant,
	disabled,
	width,
	height,
	icon,
	onClick,
	isLoading,
	style,
	iconType,
	className = "",
}) => {
	return (
		<button
			type={type}
			className={classNames(
				styles.icon_button,
				disabled && styles.disabled,
				styles[size],
				styles[variant],
				className
			)}
			style={{
				...style,
			}}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading ? (
				<span className={styles.icon_button__loader}>
					<ButtonSpinner type={variant === "danger" ? "red" : "purple"} />
				</span>
			) : (
				<span
					className={classNames(
						styles.icon_button__icon,
						iconType && styles[iconType]
					)}
				>
					<Icon
						icon={icon as IconType}
						svgProps={{
							width,
							height,
							color: variant === "danger" ? Colors.status_red : Colors.accent,
						}}
					/>
				</span>
			)}
		</button>
	);
};

export default IconButtonComponent;

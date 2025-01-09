
import { type FC } from "react";
import type { TButton } from "./types";
import Icon from "../icon";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { ButtonSpinner } from "../../utils";
const ButtonComponent: FC<TButton> = ({
	size,
	type = "button",
	variant,
	disabled,
	width,
	height,
	icon,
	iconFill,
	text,
	onClick,
	isLoading,
	style,
	className = "",
	href,
}) => {
	return (
		<button
			type={type}
			className={classNames(
				styles.button,
				styles[size],
				styles[variant],
				disabled && variant === "primary" && styles.primary_disabled,
				disabled && variant === "text" && styles.text_disabled,
				disabled && variant === "secondary" && styles.secondary_disabled,
				disabled && variant === "dashed" && styles.dashed_disabled,
				disabled && variant === "dashed_selected" && styles.dashed_selected,
				className
			)}
			style={{ width, height, ...style }}
			onClick={onClick}
			disabled={disabled}
			aria-label={text ?? "button loxala"}
		>
			<a href={href ?? ""}>
				{isLoading ? (
					<div className={styles.button__loader}>
						<ButtonSpinner type={variant === "primary" ? "white" : "purple"} />
						<span className={styles.loading_text}>{text}</span>
					</div>
				) : (
					<span className={styles.button__content}>
						<span
							className={classNames(
								styles.button__content__text,
								disabled && styles.slideDisabled
							)}
						>
							{icon && <Icon icon={icon} fill={iconFill} />}
							{text}
						</span>
					</span>
				)}
			</a>
		</button>
	);
};

export default ButtonComponent;

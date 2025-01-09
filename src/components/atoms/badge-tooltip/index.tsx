
import React, { type FC } from "react";
import { type IBadgeTooltipPropTypes } from "./types";
import { Tooltip } from "antd";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Icon from "../icon";

const BadgeTooltipComponent: FC<IBadgeTooltipPropTypes> = ({
	type,
	icon,
	placement,
	title,
	text,
	languageLevel,
	isAllTooltip,
}) => {
	return isAllTooltip ? (
		<>
			<Tooltip title={title} placement={placement} trigger="hover">
				<div
					className={classNames(
						styles.container,
						type === "master-forms" && styles.master_tooltip,
						type === "standart" && styles.standart_tooltip,
						type === "language" && styles.language_tooltip,
						type === "standart-company" && styles.standart_company_tooltip
					)}
				>
					<article className={styles.icon}>
						{icon && <Icon icon={icon} />}
					</article>

					<div
						className={classNames(
							styles.block,
							type === "language" && styles.language_block
						)}
					>
						<p
							className={classNames(
								styles.tooltip_title,
								type === "standart-company" && styles.white_style
							)}
						>
							{text}
						</p>
						{languageLevel && <span>{languageLevel}</span>}
					</div>
				</div>
			</Tooltip>
		</>
	) : (
		<>
			<div
				className={classNames(
					styles.container,
					type === "master-forms" && styles.master_tooltip,
					type === "standart" && styles.standart_tooltip,
					type === "language" && styles.language_tooltip,
					type === "standart-company" && styles.standart_company_tooltip
				)}
			>
				<Tooltip title={title} placement={placement} trigger="hover">
					<article className={styles.icon}>
						{icon && <Icon icon={icon} />}
					</article>
				</Tooltip>
				<div
					className={classNames(
						styles.block,
						type === "language" && styles.language_block
					)}
				>
					<p
						className={classNames(
							styles.tooltip_title,
							type === "standart-company" && styles.white_style
						)}
					>
						{text}
					</p>
					{languageLevel && <span>{languageLevel}</span>}
				</div>
			</div>
		</>
	);
};

export default BadgeTooltipComponent;

import React, { type FC } from "react";
import type { TFilledChecbkox } from "./types";
import { Checkbox } from "antd";
import { Icon } from "..";
import classNames from "classnames";
import styles from "./styles.module.scss";

const FilledCheckbox: FC<TFilledChecbkox> = ({
	disabled,
	checked,
	onChange,
	label,
	name,
	icon,
	theme = "deault",
	variant = "default",
	className = "",
	no_active_bg,
	fullWidth
}) => {
	return (
		<article
			className={classNames(
				styles.checkbox,
				fullWidth && styles.full_width,
				checked && styles.active,
				no_active_bg && styles.no_active_bg,
				disabled && styles.disabled,
				styles[variant],
				theme && styles[theme]
			)}
		>
			<Checkbox
				className={className}
				checked={checked}
				disabled={disabled}
				onChange={(e) => {
					onChange(e.target.checked, name);
				}}
			>
				<span className={classNames(styles.text, theme && styles[theme])}>
					{icon && (
						<span>
							<Icon icon={icon} />
						</span>
					)}
					<p>{label ? label : ""}</p>
				</span>
			</Checkbox>
		</article>
	);
};

export default FilledCheckbox;

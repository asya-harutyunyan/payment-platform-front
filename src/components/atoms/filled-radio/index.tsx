import React, { type FC } from "react";
import type { TFilledRadio } from "./types";
import { Radio } from "antd"; // Replacing Checkbox with Radio
import { Icon } from "..";
import classNames from "classnames";
import styles from "./styles.module.scss";

const FilledRadio: FC<TFilledRadio> = ({
	disabled,
	checked,
	onChange,
	label,
	name,
	icon,
	theme = "default",
	variant = "default",
}) => {
	return (
		<article
			className={classNames(
				styles.radio, // Adjusted to "radio" class if needed
				checked && styles.active,
				disabled && styles.disabled,
				styles[variant],
				theme && styles[theme]
			)}
		>
			<Radio
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
			</Radio>
		</article>
	);
};

export default FilledRadio;

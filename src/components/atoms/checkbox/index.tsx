import { type FC } from "react";
import { type ICheckbox } from "./types";
import { Checkbox } from "antd";
import styles from "./styles.module.scss";
import classNames from "classnames";

const CheckboxComponent: FC<ICheckbox> = ({
	disabled,
	checked,
	onChange,
	label,
	darkMode,
}) => {
	return (
		<article
			className={classNames(styles.checkbox, darkMode && styles.darkmode)}
		>
			<Checkbox checked={checked} disabled={disabled} onChange={onChange}>
				{label ? label : ""}
			</Checkbox>
		</article>
	);
};

export default CheckboxComponent;

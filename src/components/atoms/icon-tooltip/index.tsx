import React, { FC, memo } from "react";
import { IIconTooltip } from "@/components/atoms/icon-tooltip/types";
import styles from "@/components/atoms/badge-tooltip/styles.module.scss";
import Icon from "../icon";
import { Tooltip } from "antd";

const IconTooltip: FC<IIconTooltip> = ({
	title,
	placement,
	icon,
	svgProps,
}) => {
	return (
		<Tooltip title={title} placement={placement} trigger="hover">
			<article
				className={styles.icon}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
				}}
			>
				<Icon icon={icon} svgProps={svgProps} />
			</article>
		</Tooltip>
	);
};

export default memo(IconTooltip);

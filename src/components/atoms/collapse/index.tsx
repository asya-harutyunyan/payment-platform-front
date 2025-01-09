
import { type FC, useLayoutEffect, useState } from "react";
import styles from "./styles.module.scss";
import type { TCollapseProps } from "./types";
import { Collapse } from "antd";
import Icon from "../icon";

const CollapseComponent: FC<TCollapseProps> = ({
	headerChild,
	bodyChild,
	isActive,
	iconOpen,
	leftIcon,
	rowClick,
	isNotCollapsable,
	collapseType,
	label,
	iconClick,
	iconPosition = "end",
	customIcon,
}) => {
	const [activeKey, setActiveKey] = useState<string | string[]>([]);
	useLayoutEffect(() => {
		setActiveKey(isActive ? ["1"] : []);
	}, [isActive]);

	return (
		<div className={styles.wrapper} onClick={rowClick}>
			<Collapse
				activeKey={isNotCollapsable ? ["not-active"] : activeKey}
				onChange={(keys) => setActiveKey(keys)}
				defaultActiveKey={["0"]}
				expandIconPosition={iconPosition}
				className={styles.collapse}
				expandIcon={() =>
					iconOpen ? (
						<span onClick={iconClick}>
							{" "}
							{!customIcon && iconOpen === "IconChevronBottom" ? (
								!!activeKey.length ? (
									<Icon icon={"IconChevronTop"} />
								) : (
									<Icon icon={"IconChevronBottom"} />
								)
							) : !customIcon && iconOpen === "IconChevronRight" ? (
								!!activeKey.length ? (
									<Icon
										icon={"IconChevronRight"}
										svgProps={{ width: "24px", height: "24px" }}
									/>
								) : (
									<Icon
										icon={"IconChevronBottom"}
										svgProps={{ width: "24px", height: "24px" }}
									/>
								)
							) : (
								<Icon icon={iconOpen} />
							)}
						</span>
					) : null
				}
				collapsible={collapseType}
				items={[
					{
						key: "1",
						label: (
							<div className={styles.header}>
								<aside className={styles.info}>
									{leftIcon && (
										<div className={styles.icon}>
											<Icon icon={leftIcon} />
										</div>
									)}
									<p>{label}</p>
								</aside>
								<div className={styles.child}>{headerChild}</div>
							</div>
						),
						children: bodyChild,
					},
				]}
			/>
		</div>
	);
};
export default CollapseComponent;

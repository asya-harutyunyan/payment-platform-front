
import type { ITable } from "./types";
import styles from "./styles.module.scss";
import { IColumnConfig } from "@/models/table.model";
import { Icon } from "@/components";
import { useMount, useWindowSize } from "react-use";
import { Breakpoints } from "@/constants";
import { useState } from "react";

function TableComponent<T>({
	data,
	actionsList,
	columnConfig,
	hasActions,
	handleClickAction,
	onRowClick,
}: ITable<T>) {
	const { width } = useWindowSize();
	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(() => true));
	return (
		mounted && (
			<>
				{width > Breakpoints.mini_tablet ? (
					<div className={styles.table}>
						<div className={styles.scroll}>
							<ul className={styles.header}>
								{columnConfig.map((column: IColumnConfig<T>, index) => {
									return (
										column.isVisible && (
											<li style={column.customStyle} key={index}>
												{column.title}
											</li>
										)
									);
								})}
								{hasActions && (
									<li
										className={styles.hasAction}
										style={{ minWidth: "170px", width: "100%" }}
									>
										Actions
									</li>
								)}
							</ul>
							<div className={styles.body}>
								{data && data.length > 0 ? (
									data.map((item, index) => (
										<ul
											key={index}
											onClick={() => onRowClick && onRowClick(item)}
										>
											{columnConfig.map((column: IColumnConfig<T>, i) => {
												return (
													column.isVisible && (
														<li style={column.customStyle} key={i}>
															{column.setRow(item, index)}
														</li>
													)
												);
											})}
											{hasActions && (
												<li className={styles.actions}>
													{actionsList?.length &&
														actionsList.map((action, index) => {
															return (
																<div
																	key={index}
																	onClick={(e) => {
																		e.stopPropagation();
																		handleClickAction &&
																			handleClickAction(action, item);
																	}}
																	className={styles.item}
																>
																	<Icon icon={action.icon} />
																</div>
															);
														})}
												</li>
											)}
										</ul>
									))
								) : (
									<div className={styles.empty_list}>
										<div className={styles.empty_content}>
											<span>
												<Icon icon={"IconWarningCircle"} />
											</span>
											<p>Empty List</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className={styles.mobile_table}>
						{data && data.length > 0 ? (
							data.map((item, index) => (
								<ul key={index} className={styles.mobile_block}>
									{columnConfig.map((column: IColumnConfig<T>, i) => {
										return (
											column.isVisible && (
												<li style={column.customStyle} key={i}>
													<div className={styles.title}>{column.title}</div>
													<div className={styles.sub_title}>
														{column.setRow(item, index)}
													</div>
												</li>
											)
										);
									})}
								</ul>
							))
						) : (
							<div className={styles.mobile_block}>
								<span>
									<Icon icon={"IconWarningCircle"} />
								</span>
								<p>Empty List</p>
							</div>
						)}
					</div>
				)}
			</>
		)
	);
}

export default TableComponent;

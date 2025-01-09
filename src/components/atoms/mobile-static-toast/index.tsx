
import React, { FC } from "react";
import Icon from "../icon";
import styles from "./styles.module.scss";
import { MobileStaticToastPropTypes } from "./types";
import classNames from "classnames";

const MobileStaticToast: FC<MobileStaticToastPropTypes> = ({
	type,
	title,
	body,
	showNotification,
	handleShowNotification,
	customIcon,
}) => {
	return (
		showNotification && (
			<>
				<div className={styles.toast}>
					<div className={classNames(styles.toast_container)}>
						<div className={styles.header}>
							<div className={styles.icon}>
								<Icon
									icon={
										customIcon
											? customIcon
											: type === "error"
												? "IconToastError"
												: "IconToastSuccess"
									}
								/>
							</div>
							<p
								className={classNames(
									type === "success" ? styles.success : styles.error
								)}
							>
								{title}
							</p>

							<button
								className={classNames(styles.icon, styles.closeIcon)}
								onClick={handleShowNotification}
							>
								<Icon icon="IconClose" />
							</button>
						</div>
						<p className={styles.message}>{body}</p>
					</div>
				</div>
			</>
		)
	);
};

export default MobileStaticToast;

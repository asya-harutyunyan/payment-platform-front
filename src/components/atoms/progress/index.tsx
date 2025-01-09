import { Progress } from "antd";
import { FC } from "react";
import { TProgress } from "./types";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Colors } from "@/constants";

const ProgressComponent: FC<TProgress> = ({
	starsCount,
	reviewCount,
	percent,
	theme,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.child}>
				{
					<span
						className={classNames(
							styles.stars_count,
							theme === 3 || (theme === 4 && styles.dark)
						)}
					>{`${starsCount} stars`}</span>
				}
			</div>
			<div className={styles.child}>
				<div className={styles.progress}>
					<Progress
						percent={percent}
						strokeColor={theme === 4 ? "white" : "#7A58D0"}
						trailColor={
							theme === 4
								? "#502F71"
								: theme === 3
									? "#383639"
									: Colors.light_grey
						}
						strokeWidth={6}
						showInfo={false}
					/>
				</div>
			</div>

			<div className={styles.child}>
				{reviewCount && (
					<span className={styles.review_count}>{`(${reviewCount})`}</span>
				)}
			</div>
		</div>
	);
};

export default ProgressComponent;

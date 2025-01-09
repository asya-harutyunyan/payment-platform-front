
import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface CircleProgressProps {
	percent: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ percent }) => {
	const [currentPercent, setCurrentPercent] = useState(0);
	const circleRef = useRef<SVGCircleElement>(null);

	const radius = 22.5;
	const perimeter = 2 * Math.PI * radius;

	useEffect(() => {
		let animationFrame: number;

		const animateProgress = () => {
			setCurrentPercent((prev) => {
				if (prev < percent) {
					return prev + 1;
				} else {
					cancelAnimationFrame(animationFrame);
					return percent;
				}
			});
			animationFrame = requestAnimationFrame(animateProgress);
		};

		animationFrame = requestAnimationFrame(animateProgress);
		return () => cancelAnimationFrame(animationFrame);
	}, [percent]);

	useEffect(() => {
		if (circleRef.current) {
			const offset = perimeter * (1 - currentPercent / 100);
			circleRef.current.style.strokeDashoffset = `${offset}`;
		}
	}, [currentPercent, perimeter]);

	return (
		<div className={styles.graphContainer}>
			<svg className={styles.svg} width="55px" height="55px" fill="none">
				<circle
					className={styles.circleBackground}
					cx="27.5"
					cy="27.5"
					r={radius}
					style={{
						strokeDasharray: `${perimeter} ${perimeter}`,
					}}
				/>
				<circle
					ref={circleRef}
					className={styles.circleProgress}
					cx="27.5"
					cy="27.5"
					r={radius}
					style={{
						strokeDasharray: `${perimeter} ${perimeter}`,
					}}
				/>
			</svg>
			<span className={styles.percentText}>{currentPercent}%</span>
		</div>
	);
};

export default CircleProgress;

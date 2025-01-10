
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
// import { LazyLottie } from "@/components/molecules";

const PageLoaderComponent = (loading: { loading: boolean }) => {
	const [, setProgress] = useState<number>(0);

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;

		if (loading) {
			timer = setInterval(() => {
				setProgress((prevProgress) =>
					prevProgress >= 100 ? 100 : prevProgress + 10
				);
			}, 500);
		} else {
			if (timer) {
				clearInterval(timer);
			}
			setProgress(0);
		}

		return () => clearInterval(timer);
	}, [loading]);

	return (
		<div className={styles.wrapper}>
		
		</div>
	);
};

export default PageLoaderComponent;

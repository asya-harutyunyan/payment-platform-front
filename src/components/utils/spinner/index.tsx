
import styles from "./styles.module.scss";
import { Icon } from "@/components";

const ButtonSpinner = ({ type }: { type: "purple" | "red" | "white" }) => {
	return (
		<div className={styles.spinner}>
			{type === "red" ? (
				<Icon icon={"IconSpinnerRed"} />
			) : type === "white" ? (
				<Icon icon={"IconSpinnerWhite"} />
			) : (
				<Icon icon={"IconSpinner"} />
			)}
		</div>
	);
};

export default ButtonSpinner;


import styles from "./styles.module.scss";

import { FC} from "react";
import { ILoginPropTypes } from "./types";

const LoginForm: FC<ILoginPropTypes> = () => {


	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={() => {}}
				data-netlify-honeypot="bot-field"
			>
			
			</form>
				<div className={styles.wrong_role}>
					
				</div>
			
		</div>
	);
};

export default LoginForm;

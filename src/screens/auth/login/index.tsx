import styles from "./login.module.scss";

import { FC } from "react";
import { ILoginPropTypes } from "./types";
import { LoginForm } from "../../../auth";

const LoginScreen: FC<ILoginPropTypes> = ({ role }) => {
	return (
		<div className={styles.wrapper}>
			
			<LoginForm role={role} />
		</div>
	);
};

export default LoginScreen;

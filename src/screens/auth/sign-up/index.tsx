import styles from "./styles.module.scss";
import { useMount, useWindowSize } from "react-use";

import { FC, useState } from "react";
import { ISignUpPropTypes } from "./types";
import { Breakpoints } from "../../../constants";
import { SignUpForm } from "../../../auth";

const SignUpScreen: FC<ISignUpPropTypes> = ({ role }) => {
	const { width } = useWindowSize();
	const [showContent, setShowContent] = useState<boolean>(false);
	const [pageTabIndex, ] = useState<number>(0);
	useMount(() => {
		setShowContent(true);
	});
	return (
		showContent && (
			<section className={styles.wrapper}>
				<div className={styles.container}>
					{width > Breakpoints.mobile_x ? (
						<div className={styles.child}>
							<div className={styles.slider}>
								
							</div>
							<div className={styles.form}>
								<SignUpForm role={role} />
							</div>
						</div>
					) : (
						<div className={styles.mobile_child}>
							{pageTabIndex === 0 && (
								<div className={styles.mob_slider}>
									<div className={styles.overlay}>
										
									</div>
								</div>
							)}
							{pageTabIndex === 1 && <SignUpForm role={role} />}
						</div>
					)}
				</div>
			</section>
		)
	);
};

export default SignUpScreen;

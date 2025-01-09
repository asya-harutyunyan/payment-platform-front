
import React, { FC } from "react";
import { IAuthWarning } from "./types";
import styles from "./styles.module.scss";
import { useWindowSize } from "react-use";
import { Breakpoints } from "../../../../constants";
import { Icon } from "../../../atoms";


const AuthWarning: FC<IAuthWarning> = ({ onClose, role }) => {
	const currentRoleName = role === "em" ? "Freelancer" : "Client";
	const { width } = useWindowSize();

	const handleNavigateLogin = () => {
	
	};

	const handleNavigateSignup = () => {
	
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Icon
					icon={"IconLogo"}
					svgProps={{
						width: width > Breakpoints.mobile_x ? 140 : 95,
						height: width > Breakpoints.mobile_x ? 56 : 46,
					}}
				/>
			</div>
			<div className={styles.content}>
				<h2
					className={styles.title}
				>{`You Already Have a ${currentRoleName} Account`}</h2>
				<p
					className={styles.sub_title}
				>{`Hey, it looks like you already have a ${currentRoleName} account with us.`}</p>

				<div className={styles.blocks}>
					<div className={styles.block}>
						<div className={styles.image}>
							
						</div>
						<div className={styles.block_texts}>
							<h2>Manage Your Work</h2>
							<p>
								{role === "em"
									? "To continue managing your freelance work, simply head to your Freelancer Dashboard. "
									: "To continue managing your projects or hiring freelancers, simply head to your Client Dashboard."}
							</p>

							<span
								role="button"
								onClick={() => {
									handleNavigateLogin();
									onClose();
								}}
							>
								{`Continue to ${currentRoleName} Dashboard`}
								<Icon icon="IconChevronRight" />
							</span>
						</div>
					</div>
					<div className={styles.block}>
						<div className={styles.image}>
							
						</div>
						<div className={styles.block_texts}>
							<h2> {`Sign Up as a ${currentRoleName}`}</h2>
							<p>
								{role === "em"
									? "To continue managing your freelance work, simply head to your Freelancer Dashboard. "
									: "To continue managing your projects or hiring freelancers, simply head to your Client Dashboard."}
							</p>

							<span
								role="button"
								onClick={() => {
									handleNavigateSignup();
									onClose();
								}}
							>
								{`Sign Up as a ${currentRoleName} with a New Email`}
								<Icon icon="IconChevronRight" />
							</span>
						</div>
					</div>
					<div className={styles.warning_text}>
						<div className={styles.icon}>
							<Icon icon="IconWarningCircleGradient" />
						</div>

						<p>
							Using the same email for both freelancer and client accounts isn’t
							allowed. Please use separate emails to keep your accounts
							organized.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthWarning;

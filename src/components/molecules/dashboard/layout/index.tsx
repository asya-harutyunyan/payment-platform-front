
import  { FC } from "react";
import styles from "./styles.module.scss";
import type { IDashboardLayout } from "./types";
import classNames from "classnames";
import EmSideMenu from "../../em-side-menu";
import SideMenu from "../../side-menu";

const DashboardLayout: FC<IDashboardLayout> = ({
	children,
	onboardingStyle = false,
	profileStyle = false,
	isOnboardingCompleted,
	masterUi,
	userRole,
	setIsOnboardingCompleted,
	packagesStyles,
}) => {

	return (
		<div
			className={classNames(
				styles.container,
				onboardingStyle && styles.block,
				packagesStyles && styles.packagesContainer
			)}
		>
			{userRole === "freelancer" ? (
				<SideMenu
					isOnboardingCompleted={isOnboardingCompleted}
					setIsOnboardingCompleted={setIsOnboardingCompleted}
				/>
			) : (
				<EmSideMenu
					isOnboardingCompleted={isOnboardingCompleted}
					setIsOnboardingCompleted={setIsOnboardingCompleted}
				/>
			)}

			<div
				className={classNames(
					styles.pages,
					(onboardingStyle || masterUi) && styles.no_padding,
					profileStyle && styles.profile_block,
				)}
			>
				<div
					className={classNames(
						styles.page_content,
						(onboardingStyle || masterUi) && styles.onboarding,
						profileStyle && styles.profile_page
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

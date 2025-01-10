
import  { FC } from "react";
import styles from "./styles.module.scss";
import type { IDashboardLayout } from "./types";
import classNames from "classnames";
import EmSideMenu from "../../sidebar";
import SideMenu from "../../side-menu";
import { SideBar } from "@/auth/dashboard";
import DashboardPage from "../../sidebar";

const DashboardLayout: FC<IDashboardLayout> = ({
	children,
	onboardingStyle = false,
	profileStyle = false,
	masterUi,
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
			<DashboardPage children={undefined}/>

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

import { ReactNode } from "react";

type TUser = {
	email: string;
	email_verified_at: string;
	id: number;
	last_name: string;
	name: string;
};

export type IDashboardLayout = {
	children: ReactNode;
	user: TUser | undefined;
	userRole: "freelancer" | "employer";
	onboardingStyle?: boolean;
	profileStyle?: boolean;
	masterUi?: boolean;
	isOnboardingCompleted: boolean;
	setIsOnboardingCompleted: (val: boolean) => void;
	packagesStyles?: boolean
};


import { v4 as uuidv4 } from "uuid";
import a from "next/a";
import { IMenuItems } from "../types";

const useEmSideBarConfig = (isMenuItemsLocked: boolean) => {

	const menuItems: IMenuItems = {
		items: [
			{
				key: uuidv4(),
				label: "Dashboard",
				hasSubMenu: false,
				icon: "IconAsideDashboard",
				href: "/dashboard",
				identificator: "dashboard",
				isLocked: !isMenuItemsLocked,
				svgFill: "path",
			},
			{
				key: uuidv4(),
				label: "Profile",
				hasSubMenu: false,
				icon: "IconFreelancer",
				href: "/em-profile/onboarding",
				identificator: "em-profile",
				isLocked: false,
				svgFill: "path",
			},
			{
				key: uuidv4(),
				label: "Find a Freelancer",
				hasSubMenu: false,
				icon: "IconFindJob",
				href: "/em-profile/onboarding",
				identificator: "em-find-freelancer",
				isLocked: !isMenuItemsLocked,
				svgFill: "path",
			},
			{
				key: uuidv4(),
				label: "Messages",
				hasSubMenu: false,
				icon: "IconEnvelopSimple",
				identificator: "message",
				isLocked: !isMenuItemsLocked,
				href: "/chat",
				svgFill: "path",
			},
			{
				key: uuidv4(),
				label: "Bookings",
				hasSubMenu: false,
				icon: "IconCalendarMenu",
				identificator: "bookings",
				isLocked: !isMenuItemsLocked,
				href: "/bookings",
				svgFill: "path_fill",
			},
			{
				key: uuidv4(),
				label: "My Jobs",
				hasSubMenu: false,
				icon: "IconBrief",
				href: "/em-my-jobs",
				identificator: "em-my-jobs",
				isLocked: !isMenuItemsLocked,
				svgFill: "path",
			},

			{
				key: uuidv4(),
				label: "Finances",
				hasSubMenu: false,
				icon: "IconMoneyBagOutline",
				identificator: "em-finances",
				isLocked: !isMenuItemsLocked,
				href: "/em-profile/onboarding",
				svgFill: "path_fill",
			},
			{
				key: uuidv4(),
				label: "Notifications",
				hasSubMenu: false,
				icon: "IconSideNotification",
				identificator: "notifications",
				isLocked: !isMenuItemsLocked,
				svgFill: "path",
			},
			{
				key: uuidv4(),
				label: "Settings",
				hasSubMenu: true,
				icon: "IconAsideSettings",
				identificator: "settings",
				isLocked: !isMenuItemsLocked,
				svgFill: "g",
			},
		],
		subs: {
			Settings: [
				{
					key: "sub1",
					label: "Profile Settings",
					children: [
						{
							key: "email-management",
							label: (
								<a href={'/'}>
									Email Management
								</a>
							),
						},
						{
							key: "mobile-number",
							label: (
								<a href={'/'}>
Mobile Number</a>
							),
						},
						{
							key: "address-update",
							label: (
								<a href={'/'}>

									Address Update
								</a>
							),
						},
						{
							key: "url-customization",
							label: (
								<a href={'/'}>
									URL Customization
								</a>
							),
						},
						{
							key: "close-account",
							label: (
								<a href={'/'}>
									Close Your Account
								</a>
							),
						},
					],
				},
				{
					key: "sub2",
					label: "Password & Security",
					children: [
						{
							key: "twofa-authentication",
							label: (
								<a href={'/'}>
									2FA Authentication
								</a>
							),
						},
						{
							key: "change-password",
							label: (
								<a href={'/'}>
									Change Password
								</a>
							),
						},
						{
							key: "security-questions",
							label: (
								<a href={'/'}>
									Security Questions
								</a>
							),
						},
					],
				},
				{
					key: "sub3",
					label: "Payments & Withdrawal",
					children: [
						{
							key: "payments",
							label: (
								<a href={'/'}>
Payments</a>
							),
						},
						{
							key: "sub3-2",
							label: 								<a href={'/'}>
Sub 2</a>,
						},
						{
							key: "sub3-3",
							label: 								<a href={'/'}>
Sub 3</a>,
						},
					],
				},
				{
					key: "sub4",
					label: "Subscriptions",
					children: [
						{
							key: "sub4-1",
							label: (
								<a href="/settings/twofa-authentication">
									Subscriptions 1
								</a>
							),
						},
						{
							key: "sub4-2",
							label: (
								<a href="/settings/change-password">Subscriptions 2</a>
							),
						},
						{
							key: "sub4-3",
							label: (
								<a href="/settings/security-questions">Subscriptions 3</a>
							),
						},
					],
				},
				{
					key: "sub5",
					label: "ID Verification",
					children: [
						{
							key: "sub5-1",
							label: (
								<a href="/settings/twofa-authentication">
									ID Verification 1
								</a>
							),
						},
						{
							key: "sub5-2",
							label: (
								<a href="/settings/change-password">ID Verification 2</a>
							),
						},
						{
							key: "sub5-3",
							label: (
								<a href="/settings/security-questions">
									ID Verification 3
								</a>
							),
						},
					],
				},
				{
					key: "sub6",
					label: "Notification Settings",
					children: [
						{
							key: "sub6-1",
							label: (
								<a href="/settings/twofa-authentication">
									Notification Settings 1
								</a>
							),
						},
						{
							key: "sub6-2",
							label: (
								<a href="/settings/change-password">
									Notification Settings 2
								</a>
							),
						},
						{
							key: "sub6-3",
							label: (
								<a href="/settings/security-questions">
									Notification Settings 3
								</a>
							),
						},
					],
				},
				{
					key: "login-history",
					label: (
						<a href={'/'}>Login History</a>
					),
				},
			],
		},
	};
	return {
		menuItems,
	};
};
export default useEmSideBarConfig;

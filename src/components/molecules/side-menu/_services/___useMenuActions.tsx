import { useEffect, useState } from "react";
import { IMenuItem } from "../types";
import { useWindowSize } from "react-use";
import { Breakpoints } from "../../../../constants";
const useMenuActions = (
	isOnboardingCompleted: boolean,
) => {
	const [showOnboardingModal, setShowOnboardingModal] =
		useState<boolean>(false);
	const [desktopVersionCollapse, setDesktopVersionCollapse] =
		useState<boolean>(true);
	const { width } = useWindowSize();

	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const [activeMenuTitle, setActiveMenuTitle] = useState<string>("");
	const [activeSideMenuButton, setActiveSideMenuButton] = useState<
		string | null
	>("");
	const [activeColapseMenu, setActiveColapseMenu] = useState("");


	useEffect(() => {
		if (!isOnboardingCompleted) {
			setDesktopVersionCollapse(false);
		} else {
			setDesktopVersionCollapse(true);
		}
	}, [isOnboardingCompleted]);


	const toggleMobileMenuOpen = () => {
		setShowMobileMenu((cur) => !cur);
	};

	const closeModal = () => {
		setShowOnboardingModal(false);
	};



	const handleMenuClick = (el: IMenuItem) => {
		setDesktopVersionCollapse(false);
		if (el.hasSubMenu && !el.isLocked) {
			setActiveMenuTitle(el.label);
			setActiveSideMenuButton(el.identificator);
		} else {
			if (width < Breakpoints.mobile_x) {
				setActiveMenuTitle("");
				setActiveSideMenuButton(el.identificator);
				toggleMobileMenuOpen();
			} else {
				setActiveMenuTitle("");
				setActiveSideMenuButton(el.identificator);
				if (width < Breakpoints.tablet_x) {
					setShowMobileMenu(false);
				}
			}
		}

		if (!isOnboardingCompleted) {
			if (
				el.label === "Profile"

				// el.label === "My Projects" ||
			) {
				setShowOnboardingModal(false);
			} else {
				setShowOnboardingModal(true);
			}
		} else {
			setShowOnboardingModal(false);
		}
	};



	const handleOnOpenChange = (val: string[]) => {
		setActiveColapseMenu(val[1]);
	};

	const handleRemoveOpenKeys = () => {
		setActiveMenuTitle("");
	};

	const closeOpenColapse = () => {
		setActiveColapseMenu("");
		setDesktopVersionCollapse(false);
	};

	const handleCloseDesktopVersionCollapse = () => {
		if (isOnboardingCompleted) {
			setDesktopVersionCollapse(true);
		} else {
			setDesktopVersionCollapse(false);
		}
	};



	return {
		handleMenuClick,
		toggleMobileMenuOpen,
		showMobileMenu,
		handleRemoveOpenKeys,
		activeColapseMenu,
		activeMenuTitle,
		activeSideMenuButton,
		handleOnOpenChange,
		showOnboardingModal,
		closeModal,
		desktopVersionCollapse,
		handleCloseDesktopVersionCollapse,
		closeOpenColapse,
		setDesktopVersionCollapse,
	};
};

export default useMenuActions;


import { Menu } from "antd";
import styles from "./styles.module.scss";
import classNames from "classnames";
;
import useMenuActions from "./_services/___useMenuActions";
import { FC, useEffect, useRef, useState } from "react";
import useSideBarConfig from "./_services/useSideBarConfig";
import { ISideMenuPropTypes } from "./types";
import { useMount, useWindowSize } from "react-use";
import { Icon, InputComponent, ModalComponent } from "../../atoms";
import { Breakpoints } from "../../../constants";
const SideMenu: FC<ISideMenuPropTypes> = ({
	isOnboardingCompleted,
	mode = 1,
}) => {
	const [collapsed, setCollaped] = useState<boolean>(false);

	const asideRef = useRef<HTMLDivElement>(null);
	const burgerRef = useRef<HTMLDivElement>(null);

	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(true));
	const {
		toggleMobileMenuOpen,
		showMobileMenu,
		handleRemoveOpenKeys,
		activeColapseMenu,
		activeMenuTitle,
		handleOnOpenChange,
		showOnboardingModal,
		closeModal,
		desktopVersionCollapse,
		handleCloseDesktopVersionCollapse,
		setDesktopVersionCollapse,
	} = useMenuActions(isOnboardingCompleted);

	const { menuItems } = useSideBarConfig(isOnboardingCompleted);


	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				showMobileMenu &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node) &&
				burgerRef.current &&
				!burgerRef.current.contains(event.target as Node)
			) {
				toggleMobileMenuOpen();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [asideRef, burgerRef, showMobileMenu, toggleMobileMenuOpen]);

	const { width } = useWindowSize();

	useEffect(() => {
		if (activeMenuTitle) {
			setCollaped(false);
		} else {
			setCollaped(true);
		}
	}, [activeMenuTitle]);

	useEffect(() => {
		if (showMobileMenu || !desktopVersionCollapse) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [showMobileMenu, desktopVersionCollapse]);

	return (
		<>
			{mounted && (
				<>
					{showOnboardingModal && (
						<ModalComponent
							centered
							isOpen={showOnboardingModal}
							onClose={closeModal}
							title="" children={undefined}						>
							
						</ModalComponent>
					)}
					<div
						className={classNames(
							styles.burger,
							mode === 4 && styles.purple_mode
						)}
						ref={burgerRef}
					>
						{!showMobileMenu && (
							<button
								onClick={toggleMobileMenuOpen}
								className={classNames(
									styles.burger_icon,
									mode === 4 && styles.purple_mode
								)}
							>
								<Icon width="20px" height="20px" icon={"IconBurgerMenu"} />
							</button>
						)}
					</div>
					<div
						className={classNames(
							styles.overlay,
							showMobileMenu && styles.show_overlay
						)}
					/>
					<aside
						className={classNames(
							styles.menuLayout,
							showMobileMenu && styles.showMobileMenu,
							mode === 4 && styles.parple_mode
						)}
						ref={asideRef}
					>
						<div
							className={classNames(
								classNames(
									styles.menuItems,
									!collapsed && styles.collapsed,
									
									mode === 4 && styles.parple_mode,
									isOnboardingCompleted && styles.completed
								)
							)}
						>
							<div
								className={classNames(
									styles.logo,
									collapsed && !desktopVersionCollapse && styles.align_left
								)}
							>
								<a href={'/'}>
									{desktopVersionCollapse && width > Breakpoints.tablet_x}
									<Icon
										icon={
											'IconLogoWithText'
										}
									/>
								</a>
							</div>
							<div className={classNames(styles.user_info)}>
								<div className={styles.user_avatar}>
									
								</div>
								<div
									className={classNames(
										styles.user_name,
																			)}
								>
									<p>name</p>
									<Icon icon="IconVerifiedUser" />
								</div>
							</div>
							<button
								className={classNames(
									styles.close_aside,
									desktopVersionCollapse &&
										width > Breakpoints.tablet_x &&
										styles.desktopVersionCollapse,
									!desktopVersionCollapse &&
										activeMenuTitle &&
										styles.desktopVersionCollapse,
									!isOnboardingCompleted &&
										width > Breakpoints.tablet_x &&
										styles.hidden,
								)}
								// onClick={() => {
								// 	if (width < Breakpoints.tablet_x) {
								// 		toggleMobileMenuOpen();
								// 	} else {
								// 		handleCloseDesktopVersionCollapse();
								// 	}
								// }}
							>
								{desktopVersionCollapse && width > Breakpoints.tablet_x && (
									<span
										onClick={() => setDesktopVersionCollapse(false)}
										className={classNames(
											styles.iconTwoArrowsRight,
											mode === 4 && styles.parple_mode
										)}
									>
										<Icon icon="IconTwoArrowsRight" />
									</span>
								)}
								{!desktopVersionCollapse &&
									width > Breakpoints.tablet_x &&
									!activeMenuTitle && (
										<span
											className={classNames(
												styles.iconTwoArrowsLeft,
											)}
											onClick={() => {
												if (width < Breakpoints.tablet_x) {
													toggleMobileMenuOpen();
												} else {
													handleCloseDesktopVersionCollapse();
												}
											}}
										>
											<Icon icon="IconTwoArrowsLeft" />
										</span>
									)}
								{width < Breakpoints.tablet_x && (
									<span
										className={classNames(
											styles.iconTwoArrowsLeft,
										)}
										onClick={() => {
											toggleMobileMenuOpen();
										}}
									>
										<Icon icon="IconTwoArrowsLeft" />
									</span>
								)}
							</button>
							<div
								className={classNames(
									styles.search_bar,
									collapsed && styles.full_width,
								)}
							>
								<InputComponent
									value={""}
									name={""}
									onChange={() => {}}
									placeholder={"Search"}
									className={classNames(
										styles.search_input,
										collapsed && styles.full_width,
									)}
									prefix={<Icon icon={"IconSideSearch"} />}
								/>
								<span
									className={classNames(
										styles.search_button_icon,
										collapsed && styles.hidden,
									)}
								>
									{<Icon icon="IconSideSearch" />}
								</span>
							</div>
							

							
						</div>
						<div
							className={classNames(
								activeMenuTitle
									? styles.sub_menu_opened
									: styles.sub_menu_closed,
							)}
						>
							<div className={styles.subMenu_header}>
								<button
									className={styles.back_button}
									onClick={handleRemoveOpenKeys}
								>
									<Icon icon="IconChevronLeft" fill="black" />
									<span>Back</span>
								</button>
								<h2
									className={classNames(
										styles.sub_menu_title,
									)}
								>
									{activeMenuTitle}
								</h2>
							</div>
							<Menu
								openKeys={[activeColapseMenu || ""]}
								onOpenChange={(val) => {
									handleOnOpenChange(val);
								}}
								mode={"inline"}
								items={menuItems.subs[activeMenuTitle]}
								onClick={() => {
									toggleMobileMenuOpen();
								}}
								className={classNames(
									'side_menu_dark'
								)}
							/>
						</div>
					</aside>
				</>
			)}
		</>
	);
};

export default SideMenu;

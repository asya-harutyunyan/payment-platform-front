
import { Menu } from "antd";
import styles from "./styles.module.scss";
import classNames from "classnames";

import useEmMenuActions from "./_services/___useEmMenuActions";
import { FC, useEffect, useRef, useState } from "react";
import useEmSideBarConfig from "./_services/useEmSideBarConfig";
import { ISelectedKeysEvent, ISideMenuPropTypes } from "./types";
import { useMount, useWindowSize } from "react-use";
import Link from "antd/es/typography/Link";
import { Breakpoints } from "../../../constants";
import { ModalComponent, Icon, InputComponent } from "../../atoms";

const SideMenu: FC<ISideMenuPropTypes> = ({
	isOnboardingCompleted,
	mode = "light",
}) => {
	const [collapsed, setCollaped] = useState<boolean>(false);

	const asideRef = useRef<HTMLDivElement>(null);
	const burgerRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(true));
	const {
		handleMenuClick,
		toggleMobileMenuOpen,
		showMobileMenu,
		handleRemoveOpenKeys,
		activeColapseMenu,
		activeMenuTitle,
		activeSideMenuButton,
		handleSaveKeyPath,
		handleOnOpenChange,
		showOnboardingModal,
		closeModal,
		desktopVersionCollapse,
		handleCloseDesktopVersionCollapse,
		setDesktopVersionCollapse,
	} = useEmMenuActions(isOnboardingCompleted);

	const { menuItems } = useEmSideBarConfig(isOnboardingCompleted);



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
							mode === 4 && styles.purple_mode,
						)}
						ref={burgerRef}
					>
						{!showMobileMenu && (
							<button
								onClick={toggleMobileMenuOpen}
								className={classNames(
									styles.burger_icon,
									mode === 4 && styles.purple_mode,
									
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
						)}
						ref={asideRef}
					>
						<div
							className={classNames(
								classNames(
									styles.menuItems,
									!collapsed && styles.collapsed,
									desktopVersionCollapse &&
										width > Breakpoints.tablet_x &&
										styles.collapsed,
									mode === 4 && styles.parple_mode,
									isOnboardingCompleted && styles.completed
								)
							)}
						>
							<a href={'/'}>
								<div
									className={classNames(
										styles.logo,
										collapsed && !desktopVersionCollapse && styles.align_left
									)}
								>
									{desktopVersionCollapse && width > Breakpoints.tablet_x}
									<Icon
										icon={
											'IconLogoWithText'
										}
									/>
								</div>
							</a>
							<div className={classNames(styles.user_info)}>
								
								<div
									className={classNames(
										styles.user_name,
										mode === 4 && styles.parple_mode
									)}
								>
									<p>text</p>
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
									mode === 4 && styles.parple_mode
								)}
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
									mode === 4 && styles.parple_mode
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
										mode === 4 && styles.parple_mode
									)}
									prefix={<Icon icon={"IconSideSearch"} />}
								/>
								<span
									className={classNames(
										styles.search_button_icon,
										collapsed && styles.hidden,
										mode === 4 && styles.parple_mode
									)}
								>
									{<Icon icon="IconSideSearch" />}
								</span>
							</div>
							{menuItems?.items?.map((el) => {
								return (
									<Link
										href={el?.href && !el?.isLocked ? el?.href : ""}
										key={el.key}
										onClick={() => {
											handleMenuClick(el);
										}}
										className={classNames(
											styles.menu_button,
											el.identificator === activeSideMenuButton &&
												styles.menu_button_active,
											width > Breakpoints.tablet_x &&
												styles.desktop_menu_button_active,
											el.identificator === activeSideMenuButton &&
												styles.menu_button_active,
											width > Breakpoints.tablet_x &&
												styles.desktop_menu_button_active,
											desktopVersionCollapse &&
												width > Breakpoints.tablet_x &&
												el.identificator === activeSideMenuButton &&
												styles.active_menu_before_effect,
											!desktopVersionCollapse &&
												activeMenuTitle &&
												width > Breakpoints.tablet_x &&
												el.identificator === activeSideMenuButton &&
												styles.active_menu_before_effect,
											!isOnboardingCompleted &&
												el.label !== "Profile" &&
												el.label !== "My Projects" &&
												el.svgFill === "g" &&
												styles.locked_svg_fill,
											!isOnboardingCompleted &&
												el.label !== "Profile" &&
												el.label !== "My Projects" &&
												el.svgFill === "path" &&
												styles.locked_path_fill_stroke,
											!isOnboardingCompleted &&
												el.label !== "Profile" &&
												el.label !== "My Projects" &&
												el.svgFill === "path_fill" &&
												styles.locked_path_fill,

											!collapsed && styles.collapsed,
											el.svgFill === "g" && styles.svg_fill,
											el.svgFill === "path" && styles.path_fill_stroke,
											el.svgFill === "path_fill" && styles.path_fill,

											el.svgFill === "g" && mode === 4 && styles.svg_fill_dark,
											el.svgFill === "path" &&
												mode === 4 &&
												styles.path_fill_stroke_dark,
											el.svgFill === "path_fill" &&
												mode === 4 &&
												styles.path_fill_dark,
										)}
									>
										<span
											className={classNames(
												styles.menu_icon,
											)}
										>
											<Icon icon={el.icon} />
										</span>

										<p
											className={classNames(
												!isOnboardingCompleted &&
													el.label !== "Profile" &&
													el.label !== "My Projects"
													? styles.locked
													: styles.label,
												desktopVersionCollapse &&
													width > Breakpoints.tablet_x &&
													styles.hidden,
												!desktopVersionCollapse &&
													activeMenuTitle &&
													width > Breakpoints.tablet_x &&
													styles.hidden,
												mode === 4 && styles.parple_mode
											)}
										>
											{el.label}{" "}
											{el.hasSubMenu && (
												<Icon
													icon={
														activeColapseMenu
															? "IconChevronRight"
															: "IconChevronBottom"
													}
												/>
											)}
										</p>
										{!isOnboardingCompleted &&
											collapsed &&
											el.label !== "Profile" &&
											el.label !== "My Projects" && (
												<span>
													<Icon icon="IconLockGray" />
												</span>
											)}
									</Link>
								);
							})}

							<button
								className={classNames(
									styles.signOutButton,
									!collapsed && styles.collapsed,
									desktopVersionCollapse &&
										width > Breakpoints.tablet_x &&
										styles.collapsed,
									mode === 4 && styles.purple_mode
								)}
								onClick={() => {}}
							>
								<Icon icon="IconSignOut" />{" "}
								<p
									className={classNames(
										collapsed && styles.visible,
										desktopVersionCollapse &&
											width > Breakpoints.tablet_x &&
											styles.hidden
									)}
								>
									Log out
								</p>
							</button>
						</div>
						<div
							className={classNames(
								activeMenuTitle
									? styles.sub_menu_opened
									: styles.sub_menu_closed,
								mode === 4 && styles.parple_mode
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
										mode === 4 && styles.purple_mode
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
								onClick={(val: ISelectedKeysEvent) => {
									toggleMobileMenuOpen();
									handleSaveKeyPath(val?.keyPath);
								}}
								className={classNames(
									'side_menu_purple'
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


import { Button, Divider, Flex, InputRef, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { ISelect } from "./types";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { Icon, InputComponent } from "@/components";
import { IconType } from "@/components/atoms/icon";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const DropdownMenu = ({
	inputName,
	menu,
	inputRef,
	onNameChange,
	addItem,
	dropDownInputPlaceholder,
	dropDownInputButtonText,
	dropDownInputLabel,
}: {
	menu: React.ReactNode;
	inputRef: React.RefObject<InputRef>;
	onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputName: string;
	addItem: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
	dropDownInputPlaceholder?: string;
	dropDownInputButtonText?: string;
	dropDownInputLabel?: string;
}) => {
	const [name, setName] = useState("");

	const localOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		onNameChange(event);
	};

	const localAddItem = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		addItem(e);
		setName(""); // Сброс состояния name для текущего экземпляра DropdownMenu
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	return (
		<div className={styles.add_item}>
			{menu}
			<Divider style={{ margin: "8px 0" }} />
			<div className={styles.add_item__wrapper}>
				<div className={styles.add_item__wrapper__input}>
					<InputComponent
						name={inputName}
						label={dropDownInputLabel}
						placeholder={dropDownInputPlaceholder}
						ref={inputRef}
						value={name}
						onChange={localOnNameChange}
						style={{ width: "100%" }}
						onKeyDown={(e) => e.stopPropagation()}
					/>
				</div>
				<div className={styles.add_item__wrapper__button}>
					<Button type="text" icon={<PlusOutlined />} onClick={localAddItem}>
						{dropDownInputButtonText}
					</Button>
				</div>
			</div>
		</div>
	);
};

function SelectComponent<T>({
	optionList,
	optionLabelKey,
	optionValueKey,
	optionSecondLabelKey,
	optionIconKey,
	value,
	error,
	errorText,
	placeholder,
	label,
	disabled,
	mainIcon,
	isRequired,
	onChange,
	isGiveAllItem,
	onBlur,
	listHeight,
	isLoading,
	isDropdownWithInput,
	dropDownInputPlaceholder,
	dropDownInputButtonText,
	dropDownInputLabel,
	searchValue,
	warningText,
	darkMode,
	purpleMode,
	greyMode,
	...rest
}: ISelect<T>) {
	const [defaultValue, setDefaultValue] = useState(() => rest.defaultValue);
	const [items, setItems] = useState<T[]>(() => optionList ?? []);
	const [customItems, setCustomItems] = useState<T[]>([]);
	const [name, setName] = useState("");
	const [searchValueLocal, setSearchValueLocal] = useState("");
	const inputRef = useRef<InputRef>(null);

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const addItem = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		setSearchValueLocal("");
		if (name.trim()) {
			const newItem = {
				[optionLabelKey]: name,
				[optionValueKey]: name,
			} as unknown as T;
			setName("");
			setItems((prevState) => [...prevState, newItem]);
			const itemExists = customItems.some(
				(item) => item[optionLabelKey] === name && item[optionValueKey] === name
			);

			if (!itemExists) {
				setCustomItems((prevState) => [...prevState, newItem]);
			}

			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	};

	useEffect(() => {
		if (rest.defaultValue !== undefined) {
			setDefaultValue(rest.defaultValue);
		}
	}, [rest.defaultValue]);

	useEffect(() => {
		if (optionList) {
			setItems(optionList);
		}
	}, [optionList]);
	useEffect(() => {
		if (searchValue) {
			setSearchValueLocal(searchValue);
		} else {
			setSearchValueLocal("");
		}
	}, [searchValue]);

	useEffect(() => {
		if (optionList) {
			setItems((prevState) => [...prevState, ...customItems]);
		}
	}, [optionList]);

	const handleChange = (value: string) => {
		const selectedItem = items.find((item) => item[optionValueKey] === value);

		if (isGiveAllItem) {
			if (selectedItem && onChange) {
				onChange(selectedItem);
			} else {
				onChange(undefined);
			}
		} else {
			onChange(value);
		}
	};

	return (
		<div className={styles.select}>
			{label && (
				<p
					className={classNames(
						styles.select__label,
						disabled && styles.disabled
					)}
				>
					{label}
					<b>{isRequired && "*"}</b>
				</p>
			)}

			<div
				className={classNames(styles.select__box, mainIcon && styles.mainIcon)}
			>
				{!isLoading && mainIcon && (
					<span className={styles.select__box__main_icon}>
						<Icon
							icon={mainIcon as IconType}
							svgProps={{
								width: "20px",
								height: "20px",
							}}
						/>
					</span>
				)}
				{isLoading && (
					<span className={styles.select__box__main_icon}>
						<Spin
							indicator={
								<LoadingOutlined
									style={{ fontSize: 24, color: "#7a58d0", marginRight: "5px" }}
									spin
								/>
							}
						/>
					</span>
				)}
				<Select
					className={classNames(
						styles.select__box__list,
						mainIcon && styles.withIcon,
						isLoading && styles.loading,
						isLoading && defaultValue && styles.loading_value,
						darkMode && "dark_select_component",
						purpleMode && "purple_select_component",
						greyMode && "grey_select_component"
					)}
					status={error ? "error" : ""}
					disabled={isLoading || disabled}
					value={value || defaultValue}
					listHeight={listHeight ? listHeight : 136}
					searchValue={searchValue ? searchValueLocal : undefined}
					placeholder={isLoading ? "Loading..." : placeholder}
					onChange={handleChange}
					onBlur={onBlur}
					allowClear
					suffixIcon={<Icon icon={"IconChevronBottom"} />}
					getPopupContainer={(trigger) => trigger.parentNode}
					popupClassName={
						darkMode
							? "dark_select"
							: purpleMode
								? "purple_select"
								: greyMode
									? "grey_select"
									: ""
					}
					defaultValue={defaultValue}
					dropdownRender={(menu) =>
						isDropdownWithInput ? (
							<DropdownMenu
								menu={menu}
								inputName={name}
								inputRef={inputRef}
								onNameChange={onNameChange}
								addItem={addItem}
								dropDownInputPlaceholder={dropDownInputPlaceholder}
								dropDownInputButtonText={dropDownInputButtonText}
								dropDownInputLabel={dropDownInputLabel}
							/>
						) : (
							menu
						)
					}
					{...rest}
				>
					{items.map((option: T) => (
						<Select.Option
							className={styles.select__box__list__item}
							key={option[optionValueKey] as string}
							value={option[optionValueKey] as string}
						>
							<>
								<Flex gap={"8px"}>
									{optionIconKey && (
										<i className={styles.select__box__list__item__icon}>
											<Icon
												icon={option[optionIconKey as never] as IconType}
												svgProps={{
													width: "13px",
													height: "13px",
												}}
											/>
										</i>
									)}
									<div className={styles.option}>
										{isLoading ? (
											<span>Loading...</span>
										) : (
											<>
												<span>
													{
														option[
															optionLabelKey as keyof typeof optionList as never
														]
													}
												</span>
												{optionSecondLabelKey && (
													<span className={styles.optionSecondLabelKey}>
														{
															option[
																optionSecondLabelKey as keyof typeof optionList as never
															]
														}
													</span>
												)}
											</>
										)}
									</div>
								</Flex>
								{value == option[optionValueKey] && (
									<b className={styles.select__box__list__item__check}>
										<Icon
											icon={"IconCheck"}
											svgProps={{
												width: "16px",
												height: "16px",
											}}
										/>
									</b>
								)}
							</>
						</Select.Option>
					))}
				</Select>
			</div>
			{error && errorText && (
				<p className={styles.select__error_text}>
					<span>
						<Icon
							icon={"IconErrorIcon"}
							svgProps={{
								width: "14px",
								height: "14px",
							}}
						/>
					</span>
					<span>{errorText}</span>
				</p>
			)}
			{warningText && !error && !errorText && (
				<p className={styles.select__warning_text}>
					<span>
						<Icon
							icon={"IconWarningCircle"}
							svgProps={{
								width: "14px",
								height: "14px",
								fill: "green",
							}}
						/>
					</span>
					<span>{warningText}</span>
				</p>
			)}
		</div>
	);
}

export default SelectComponent;

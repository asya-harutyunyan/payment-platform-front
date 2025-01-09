
import { AutoComplete, Spin } from "antd";
import React, { useEffect, useState } from "react";
import type { IAutocomplete } from "./types"; // Ensure this type is correctly defined and imported
import classNames from "classnames";
import styles from "./styles.module.scss";
import { Icon } from "@/components";
import { IconType } from "@/components/atoms/icon";
import {  LoadingOutlined } from "@ant-design/icons";

function AutoCompleteComponent<T>({
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
	isLoading,
	...rest
}: IAutocomplete<T>) {
	const [inputValue, setInputValue] = useState(value || "");

	useEffect(() => {
		setInputValue(value || "");
	}, [value]);

	const handleSearch = () => {};

	const handleSelect = (selectedValue: string) => {
		const selectedItem = optionList?.find(
			(item) => item?.[optionValueKey] === selectedValue
		);
		if (isGiveAllItem) {
			if (selectedItem && onChange) {
				onChange(selectedItem);
			} else {
				onChange(undefined);
			}
		} else {
			onChange(selectedValue);
		}
	};
	const highlightText = (text: string, highlight: string) => {
		if (!highlight) return text;
		const regex = new RegExp(`(${highlight})`, "gi");
		const parts = text?.split(regex);

		return parts.map((part, index) =>
			part.toLowerCase() === highlight?.toLowerCase() ? (
				<strong key={index} style={{ fontWeight: "bold" }}>
					{part}
				</strong>
			) : (
				part
			)
		);
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
				{mainIcon && (
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
				<AutoComplete
					getPopupContainer={(trigger) => trigger.parentNode}
					className={classNames(
						styles.select__box__list,
						mainIcon && styles.withIcon,
						isLoading && styles.loading,
						isLoading && inputValue && styles.loading_value
					)}
					onBlur={onBlur}
					options={optionList?.map((option: T) => ({
						value: option?.[optionValueKey] as string,
						label: (
							<div className={styles.select__box__list__item}>
								<div style={{ display: "flex", gap: "8px" }}>
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
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "10px",
										}}
									>
										{isLoading ? (
											<span>Loading...</span>
										) : (
											<>
												<span>
													{highlightText(
														option?.[
															optionLabelKey as keyof typeof optionList
														] as string,
														inputValue
													)}
												</span>
												{optionSecondLabelKey && (
													<span>
														{highlightText(
															option[
																optionSecondLabelKey as keyof typeof optionList
															] as string,
															inputValue
														)}
													</span>
												)}
											</>
										)}
									</div>
								</div>
								{value === option[optionValueKey] && (
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
							</div>
						),
					}))}
					value={inputValue}
					onChange={(newValue) => {
						setInputValue(newValue);
					}}
					onSelect={handleSelect}
					onSearch={handleSearch}
					placeholder={isLoading ? "Loading..." : placeholder}
					disabled={isLoading || disabled}
					allowClear
					{...rest}
				/>
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
		</div>
	);
}

export default AutoCompleteComponent;

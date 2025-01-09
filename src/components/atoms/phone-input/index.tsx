
import React, { FC, useState } from "react";
import { TPhoneInput } from "./types";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { type ParsedCountry, PhoneInput } from "react-international-phone";
import { Icon } from "@/components";

const PhoneInputComponent: FC<TPhoneInput> = ({
	name,
	label,
	onChange,
	isRequired,
	disabled,
	value,
	hasDefaultCountryCode,
	onBlur,
	error,
	errorText,
	placeholder,
	absoluteValue,
}) => {
	const [countryCode, setCountryCode] = useState<string>("US");
	const [defaultCountryCode, setDefaultCountryCode] = useState<string>("");
	const handleInputChange = (
		value: string,
		{ country }: { country: ParsedCountry }
	) => {
		if (onChange) {
			onChange(value);
			if (country && country.iso2) setCountryCode(country.iso2.toUpperCase());
		} else if (country && country.iso2)
			setDefaultCountryCode(country.iso2.toUpperCase());
	};

	return (
		<div
			className={classNames(
				styles.phone_input,
				error && styles.error,
				disabled && styles.disabled
			)}
		>
			{label && (
				<p className={styles.phone_input__label}>
					{label}
					{isRequired && <b>*</b>}
				</p>
			)}
			<div className={styles.phone_input__box}>
				<span className={styles.phone_input__box__code}>
					{hasDefaultCountryCode ? defaultCountryCode : countryCode}
				</span>

				<PhoneInput
					countrySelectorStyleProps={{
						buttonStyle: {
							minHeight: "44px",
							borderRadius: "8px 0 0 8px",
						},
						flagStyle: {
							borderRadius: "50%",
							width: "16px",
							height: "16px",
						},
					}}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
					onBlur={onBlur}
					style={{
						borderRadius: "8px",
					}}
					disabled={disabled}
				/>
			</div>
			{absoluteValue && (
				<div className={styles.custom_value}>{absoluteValue}</div>
			)}
			{error && errorText && (
				<p className={styles.phone_input__error_text}>
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
};
export default PhoneInputComponent;

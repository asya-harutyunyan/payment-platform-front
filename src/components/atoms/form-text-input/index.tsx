
import { Input, InputRef, Spin } from "antd";
import React, { forwardRef, LegacyRef, type MouseEvent, useState } from "react";
import type { IFormTextInput } from "./types";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Icon } from "@/components";
import { LoadingOutlined } from "@ant-design/icons";
import { FieldValues, useController } from "react-hook-form";

const FormTextInputInner = <T extends FieldValues>(
	{
		control,
		name,
		defaultValue,
		label,
		placeholder,
		...props
	}: IFormTextInput<T>,
	ref: LegacyRef<InputRef>
) => {
	const { field, fieldState } = useController<T>({
		name,
		control,
		defaultValue,
		...props,
	});
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handlerClick = (data: MouseEvent<HTMLInputElement>) => {
		props.onClick?.(data);
	};

	return (
		<div
			className={classNames(styles.input, field.disabled && styles.disabled)}
			onClick={handlerClick}
		>
			{label && (
				<p
					className={classNames(
						styles.input__label,
						props.required && styles.align
					)}
				>
					{label}
					{props.isOptional && (
						<span className={styles.input__label__optional}>(optional)</span>
					)}
					{props.required && <b>*</b>}
				</p>
			)}
			<div className={styles.input__box}>
				<Input
					{...field}
					status={fieldState.error ? "error" : ""}
					size={props.size}
					ref={ref}
					type={passwordVisible ? "text" : props.inputType}
					required={props.required}
					defaultValue={defaultValue}
					placeholder={props.isLoading ? "Loading..." : placeholder}
					// onFocus={onFocusInput}
					// onKeyDown={onKeyDown}
					maxLength={props.maxLength}
					minLength={props.minLength}
					readOnly={props.readOnly}
					prefix={
						props.isLoading ? (
							<span>
								<Spin
									indicator={
										<LoadingOutlined
											style={{
												fontSize: 24,
												color: "#7a58d0",
												marginRight: "5px",
											}}
											spin
										/>
									}
								/>
							</span>
						) : (
							<span onClick={props.onClickPrefixIcon}>{props.prefix}</span>
						)
					}
					suffix={
						props.inputType === "password" ? (
							passwordVisible ? (
								<span
									style={{ cursor: "pointer" }}
									onClick={() => setPasswordVisible(false)}
								>
									<Icon icon={"IconEye"} />
								</span>
							) : (
								<span
									style={{ cursor: "pointer" }}
									onClick={() => setPasswordVisible(true)}
								>
									<Icon icon={"IconEyeSlash"} />
								</span>
							)
						) : (
							<span onClick={props.onClickSuffixIcon}>{props.suffix}</span>
						)
					}
					// {...rest}
					style={{
						borderRadius: "8px",
					}}
					aria-invalid={!!fieldState.error}
				/>
			</div>
			<p className={styles.input__error_text}>
				<span>
					{fieldState.error && fieldState.error.message && (
						<Icon
							icon={"IconErrorIcon"}
							svgProps={{
								width: "14px",
								height: "14px",
							}}
						/>
					)}
				</span>
				<span>{fieldState.error?.message}</span>
			</p>
			{props.warningText && !fieldState.error && (
				<p className={styles.input__warning_text}>
					<span>
						<Icon
							icon={"IconWarningCircle"}
							svgProps={{
								width: "14px",
								height: "14px",
							}}
						/>
					</span>
					<span>{props.warningText}</span>
				</p>
			)}
		</div>
	);
};

export default forwardRef(FormTextInputInner) as <T extends FieldValues>(
	props: IFormTextInput<T> & { ref?: LegacyRef<InputRef> }
) => React.ReactElement;

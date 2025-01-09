

import styles from "./styles.module.scss";
import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";
import type { TTextareaProps } from "./type";
import { Input } from "antd";
import { Icon } from "@/components";
import { TextAreaRef } from "antd/es/input/TextArea";
import classNames from "classnames";

const { TextArea } = Input;

const TextareaComponent = forwardRef<TextAreaRef, TTextareaProps>(
	(
		{
			label,
			maxRows,
			minRows,
			error,
			errorText,
			name,
			placeholder,
			onChange,
			value,
			warningText,
			autoSize,
			...rest
		},
		ref
	) => {
		const [textValue, setTextValue] = useState("");

		const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
			setTextValue(e.target.value);
			onChange && onChange(e);
		};

		useEffect(() => {
			if (value) {
				setTextValue(value);
			} else {
				setTextValue("");
			}
		}, [value]);

		return (
			<div className={classNames(styles.wrapper, error && styles.errors)}>
				{label && <label className={styles.label}>{label}</label>}
				<TextArea
					name={name}
					value={textValue}
					onChange={handleChangeTextarea}
					placeholder={placeholder}
					ref={ref}
					autoSize={
						autoSize
							? undefined
							: {
									minRows: minRows ? minRows : 3,
									maxRows: maxRows ? maxRows : 5,
								}
					}
					{...rest}
				/>
				{error && errorText && (
					<p className={styles.error}>
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
					<p className={styles.warning_text}>
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
);

TextareaComponent.displayName = "TextareaComponent";
export default TextareaComponent;

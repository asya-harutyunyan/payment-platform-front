

import { DatePicker } from "antd";
import styles from "./styles.module.scss";
import Icon from "../icon";
import React, { CSSProperties, forwardRef } from "react";
import { TAntDatePickerPropTypes } from "./types";

const AntDatepicker = forwardRef<HTMLDivElement, TAntDatePickerPropTypes>(
	(
		{
			label,
			defaultDate,
			onChange,
			error,
			errorText,
			onBlur,
			minDate,
			autoFocus,
			bottomSheetMode,
			format,
			placeholder,
			allowSuffixIcon = true,
			onOpenChange,
			picker,
			open
		},
		ref
	) => {
		const popupStyle: CSSProperties = bottomSheetMode
			? {
					zIndex: 9999,
					position: "absolute",
					top: "-60%",
				}
			: {};

		return (
			<div className={styles.wrapper}>
				{label && <p className={styles.select__label}>{label}</p>}
				<DatePicker
					picker={picker}
					open={open}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					ref={ref as React.Ref<typeof DatePicker>}
					defaultValue={defaultDate}
					minDate={minDate}
					className="ant-date-picker"
					format={format ? format : "DD-MM-YYYY"}
					dropdownClassName={styles.custom_date_picker_dropdown}
					// renderExtraFooter={customHeader}
					value={defaultDate}
					onChange={onChange}
					placeholder={placeholder || "Choose the date"}
					onBlur={onBlur}
					autoFocus={autoFocus}
					popperPlacement="bottom"
					onOpenChange={onOpenChange}
					placement="bottomRight"
					getPopupContainer={(trigger) => trigger.parentNode as HTMLDivElement}
					suffixIcon={
						!allowSuffixIcon ? null : (
							<div className={styles.suffix_icon}>
								<Icon icon="IconCalendar" fill="#ccc" />
							</div>
						)
					}
					allowClear={false}
					prevIcon={<Icon icon="IconChevronLeftAccent" />}
					nextIcon={<Icon icon="IconChevronRightAccent" />}
					popupStyle={popupStyle}
					inputMode="none"
					status={error && "error"}
					onFocus={(e) => e.target.blur()}
					inputReadOnly
				/>
				{error && errorText && (
					<p className={styles.error_text}>
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
);

AntDatepicker.displayName = "AntDatepicker";

export default AntDatepicker;

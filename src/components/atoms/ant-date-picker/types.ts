import { Dayjs } from "dayjs";

export type TAntDatePickerPropTypes = {
	open?:boolean
	picker?:'month'
	onChange: (date: Dayjs) => void;
	defaultDate?: Dayjs;
	error?: boolean;
	errorText?: string;
	onBlur?: () => void;
	minDate?: Dayjs;
	autoFocus?: boolean;
	bottomSheetMode?: boolean;
	label?: string;
	format?: string;
	allowSuffixIcon?: boolean;
	placeholder?: string;
	onOpenChange?: (val: boolean) => void;
};

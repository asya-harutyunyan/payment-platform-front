interface IAutoCompleteCheckbox<T> {
	id: keyof T;
	name: keyof T;
}

export interface IAutoCompleteCheckboxProps<T> {
	data: T[];
	model: IAutoCompleteCheckbox<T>;
	values?: T[];
	disabled?: boolean;
	onChange?: (selectedItems: T[]) => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	errorText?: string;
	label?: string;
	placeholder?: string;
	onSearch?: (text: string) => void;
	searchValue?: string;
	isLoading?: boolean;
}

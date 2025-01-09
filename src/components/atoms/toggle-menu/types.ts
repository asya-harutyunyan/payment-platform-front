interface IOption {
	label: string;
	value: string;
}
export interface IToggleMenuPropTypes {
	options: IOption[];
	onChange: (val: string) => void;
	value: string;
    searchQuerry? : string;
	isLoading ? :boolean
}

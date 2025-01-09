
import React, {
	ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useState,
} from "react";
import { IAutoCompleteCheckboxProps } from "./types";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import CheckboxComponent from "../checkbox";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Colors } from "../../../constants";

const AutocompleteCheckbox = <T extends object>({
	data,
	model,
	values,
	disabled,
	onChange,
	leftIcon,
	rightIcon,
	errorText,
	label,
	placeholder = "Search...",
	onSearch: onSearchProp,
	searchValue,
	isLoading,
}: IAutoCompleteCheckboxProps<T>) => {
	const [filteredData, setFilteredData] = useState(data);
	const [selectedItems, setSelectedItems] = useState<T[]>(values || []);

	const onLocalSearch = useCallback(
		(value: string) => {
			const searchValue = value.toLowerCase();
			const filtered = data.filter((item) =>
				String(item[model.name]).toLowerCase().includes(searchValue)
			);
			setFilteredData(filtered);
		},
		[data, model.name]
	);

	const handleSearch = useCallback(
		(value: string) => {
			if (onSearchProp) {
				onSearchProp(value);
			} else {
				onLocalSearch(value);
			}
		},
		[onSearchProp, onLocalSearch]
	);

	const onCheckboxChange = useCallback(
		(item: T) => {
			const itemExists = selectedItems.some(
				(selected) => selected[model.id] === item[model.id]
			);

			const newSelectedItems = itemExists
				? selectedItems.filter(
						(selected) => selected[model.id] !== item[model.id]
					)
				: [...selectedItems, item];

			setSelectedItems(newSelectedItems);
			if (onChange) {
				onChange(newSelectedItems);
			}
		},
		[selectedItems, model.id, onChange]
	);

	useEffect(() => {
		setFilteredData(data);
	}, [data]);
	useEffect(() => {
		if (values) {
			setSelectedItems(values);
		} else {
			setSelectedItems([]);
		}
	}, [values]);
	const Row = memo(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const item = filteredData[index];
			const isChecked = selectedItems.some(
				(selected) => selected[model.id] === item[model.id]
			);

			return (
				<div
					style={style}
					className={`${styles.option} ${disabled ? styles.disabled : ""}`}
				>
					<CheckboxComponent
						checked={isChecked}
						onChange={() => onCheckboxChange(item)}
						disabled={disabled}
						label={String(item[model.name])}
					/>
				</div>
			);
		}
	);

	Row.displayName = "row-item";

	return (
		<div className={styles.container}>
			<InputComponent
				label={label}
				placeholder={placeholder}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleSearch(e.target.value)
				}
				disabled={disabled}
				prefix={leftIcon}
				suffix={rightIcon}
				value={searchValue}
				name={"search"}
			/>
			<div className={styles.selectedItems}>
				{selectedItems.length > 0 && (
					<p className={styles.selectedLabel}>
						Selected: ({selectedItems.length})
					</p>
				)}
			</div>
			
			{!isLoading && filteredData.length === 0 && (
				<div className={styles.no_result_item}>
					<p className={styles.no_results_txt}>No Results</p>
				</div>
			)}
			{isLoading && (
				<div className={styles.loading}>
					<Spin
						indicator={
							<LoadingOutlined
								style={{ fontSize: 60, color: Colors.accent }}
								spin
							/>
						}
					/>
				</div>
			)}

			{errorText && <div className={styles.errorText}>{errorText}</div>}
		</div>
	);
};

export default AutocompleteCheckbox;

import type { IActions, IColumnConfig } from "@/models/table.model";
import type { ReactElement } from "react";

export interface ITable<T> {
	data: T[];
	columnConfig: IColumnConfig<T>[];
	hasActions: boolean;
	children?: ReactElement;
	actionsList?: IActions[];

	onRowClick?(row: T): void;

	handleClickAction?(type: IActions, data: T): void;
}

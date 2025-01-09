
import { Pagination } from "antd";
import { FC } from "react";
import type { TPaginationProps } from "./types";

const PaginationComponent: FC<TPaginationProps> = ({
	current_page,
	per_page,
	total,
	onPageChange,
}) => {
	return (
		<Pagination
			total={total}
			current={current_page}
			pageSize={per_page}
			hideOnSinglePage
			defaultPageSize={per_page}
			defaultCurrent={5}
			showSizeChanger={false}
			onChange={(page) => onPageChange(page)}
		/>
	);
};

export default PaginationComponent;

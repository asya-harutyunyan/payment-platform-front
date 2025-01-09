export type TPaginationProps = {
	current_page: number;
	per_page: number;
	total: number;
	onPageChange: (page: number) => void;
};

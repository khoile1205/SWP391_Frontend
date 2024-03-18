export type Column<T> = {
	title: string;
	dataIndex?: keyof T;
	align?: "center" | "left" | "right";
	width?: string;
	render?: (text: any, record: T) => JSX.Element | null;
	sorter?: (a: T, b: T) => number;
	colSpan?: number;
	filters?: { text: string; value: string }[];
	onFilter?: (value: string, record: T) => void;
};

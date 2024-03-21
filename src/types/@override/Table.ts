import { ColumnProps } from "antd/es/table";

export type Column<T> = ColumnProps<T> & {
	title: string;
	dataIndex?: keyof T;
	align?: "center" | "left" | "right";
	width?: string;
	render?: (text: any, record: T) => JSX.Element | null;
	sorter?: (a: T, b: T) => number;
	colSpan?: number;
	filters?: { text: string; value: any }[];
	onFilter?: (value: any, record: T) => void;
};

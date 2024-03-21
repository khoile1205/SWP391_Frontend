// ReusableTable.jsx

import { Table } from "antd";

interface Props<T> {
	columns: any[]; // Change to your actual column type
	dataSource: T[];
	pageSize: number;
	paginationOptions?: any; // Customize as needed
}
export const PaginationTable = <T,>({
	columns,
	dataSource,
	pageSize,
	paginationOptions,
}: Props<T>) => {
	return (
		dataSource && (
			<div>
				<Table
					columns={columns}
					dataSource={dataSource as any[]}
					pagination={{
						responsive: true,
						defaultPageSize: 5,
						showSizeChanger: false,
						pageSize: pageSize,
						...paginationOptions,
					}}
					bordered
					className="rounded-lg shadow-md "
					rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
					style={{ maxWidth: "100%", minWidth: "100%", overflowX: "auto" }}
				/>
			</div>
		)
	);
};

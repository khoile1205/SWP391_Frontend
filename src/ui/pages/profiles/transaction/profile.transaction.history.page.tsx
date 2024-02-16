import { Table, Pagination, Button, Input, Tooltip } from "antd";
import { EyeOutlined, UserOutlined, BookOutlined, MessageOutlined } from "@ant-design/icons";

interface Transaction {
	id: number;
	title: string;
	type: "user" | "recipe" | "comment";
	status: "pending" | "reject" | "accept";
	createdAt: Date;
}

const reports: Transaction[] = [
	{
		id: 1,
		title: "Test Transaction",
		type: "user",
		status: "pending",
		createdAt: new Date("2023-12-21T11:00:00"),
	},
	{
		id: 2,
		title: "Test Transaction",
		type: "recipe",
		status: "reject",
		createdAt: new Date("2023-12-21T11:00:00"),
	},
	{
		id: 3,
		title: "Test Transaction",
		type: "comment",
		status: "accept",
		createdAt: new Date("2023-12-21T11:00:00"),
	},
	{
		id: 4,
		title: "Test Transaction",
		type: "user",
		status: "pending",
		createdAt: new Date("2023-12-21T11:00:00"),
	},
];

const renderStatusColor = (status: Transaction["status"]): string => {
	switch (status) {
		case "pending":
			return "orange";
		case "reject":
			return "red";
		case "accept":
			return "green";
		default:
			return "black";
	}
};

const renderTransactionTypeIcon = (type: Transaction["type"]) => {
	switch (type) {
		case "user":
			return <UserOutlined />;
		case "recipe":
			return <BookOutlined />;
		case "comment":
			return <MessageOutlined />;
		default:
			return null;
	}
};

export default function ProfileTransactionHistory() {
	const handleViewDetail = (id: number) => {
		console.log("View details of report with ID:", id);
	};

	type Column<T> = {
		title: string;
		dataIndex?: keyof T;
		align?: "center" | "left" | "right";
		width?: number;
		render?: (text: any, record: T) => JSX.Element | null;
		sorter?: (a: T, b: T) => number;
	};

	const columns: Column<Transaction>[] = [
		{
			title: "ID",
			dataIndex: "id",
			align: "center",
			width: 50,
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Title",
			dataIndex: "title",
			render: (_text: string, record: Transaction) => (
				<Tooltip title={record.title}>{record.title}</Tooltip>
			),
		},
		{
			title: "Type",
			dataIndex: "type",
			render: (type: Transaction["type"]) => renderTransactionTypeIcon(type),
			align: "center",
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status: Transaction["status"]) => (
				<span style={{ color: renderStatusColor(status) }}>{status.toUpperCase()}</span>
			),
			align: "center",
			sorter: (a, b) => a.status.localeCompare(b.status),
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			render: (createdAt: Date) => <span>{createdAt.toLocaleDateString("en-US")}</span>,
			sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
		},
		{
			title: "Actions",
			align: "center",
			render: (_text: any, record: Transaction) => (
				<Button
					type="text"
					icon={<EyeOutlined style={{ fontSize: "16px", color: "#1890ff" }} />}
					onClick={() => handleViewDetail(record.id)}
				/>
			),
		},
	];

	return (
		<div className="flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">View Transactions</h2>
			<div className="mb-4">
				<Input
					type="text"
					placeholder="Search reports..."
					className="focus:border-blue-500 rounded-md border-gray-300 px-3 py-2 focus:outline-none"
				/>
			</div>
			<Table
				columns={columns}
				dataSource={reports}
				// pagination={{ defaultPageSize: 5, showSizeChanger: false }}
				bordered
				className="rounded-lg shadow-md"
				rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
				scroll={{ y: 400 }}
			/>
			<Pagination
				defaultCurrent={1}
				total={reports.length}
				pageSize={5}
				showQuickJumper
				style={{ marginTop: "16px", textAlign: "center" }}
			/>
		</div>
	);
}

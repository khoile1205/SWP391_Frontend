import { Tooltip, Flex, Select, Typography } from "antd";
import { CoffeeOutlined, CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Report } from "@/models/report.model";
import { ActionStatus } from "@/enums";
import { useGetUserReports } from "@/hooks/profiles";
import { useState } from "react";
import { ReportType } from "@/enums/report.type.enum";
import { PaginationTable } from "@/ui/components";

const renderStatusColor = (status: Report["status"]): string => {
	switch (status) {
		case ActionStatus.PENDING:
			return "orange";
		case ActionStatus.REJECTED:
			return "red";
		case ActionStatus.ACCEPTED:
			return "green";
		default:
			return "black";
	}
};

const renderReportTypeIcon = (type: Report["type"]) => {
	const iconMap: Record<Partial<Report["type"]>, React.ReactNode> = {
		user: <UserOutlined />,
		recipe: <CoffeeOutlined />,
		comment: <CommentOutlined />,
	};
	return iconMap[type] ? (
		<Tooltip title={type.charAt(0).toUpperCase() + type.slice(1)}>{iconMap[type]}</Tooltip>
	) : null;
};

export default function ProfileReports() {
	// Local state
	const [pageSize, setPageSize] = useState<number>(5);

	const { reports } = useGetUserReports();

	type Column<T> = {
		title: string;
		dataIndex?: keyof T;
		align?: "center" | "left" | "right";
		width?: number;
		render?: (text: any, record: T) => JSX.Element | null;
		sorter?: (a: T, b: T) => number;
	};

	const columns: Column<Report>[] = [
		{
			title: "Title",
			dataIndex: "title",
			render: (_text: string, record: Report) => (
				<Tooltip title={record.title}>{record.title}</Tooltip>
			),
			align: "center",
		},
		{
			title: "Content",
			dataIndex: "content",
			render: (_text: string, record: Report) => <Typography>{record.content}</Typography>,
			align: "center",
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: "Type",
			dataIndex: "type",
			render: (type: Report["type"]) => renderReportTypeIcon(type),
			align: "center",
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: "Target",
			dataIndex: "targetId",
			render: (_text: string, record: Report) => (
				<Typography.Link
					href={`/${record.type == ReportType.RECIPE ? `${record.type}s` : `${record.type}`}/${record.targetId}`}
				>
					Link here
				</Typography.Link>
			),
			align: "center",
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status: Report["status"]) => (
				<span style={{ color: renderStatusColor(status) }}>{status.toUpperCase()}</span>
			),
			align: "center",
			sorter: (a, b) => a.status.localeCompare(b.status),
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			render: (createdAt: Date) => <span>{new Date(createdAt).toLocaleDateString("en-US")}</span>,
			sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
	];

	return (
		<div className=" px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">View Reports</h2>
			<Flex justify="flex-end" align="center" className="mb-5 space-x-3 text-end">
				<Typography>Rows per page: </Typography>
				<Select
					defaultValue={pageSize}
					options={[
						{
							label: 5,
							value: 5,
						},
						{
							label: 10,
							value: 10,
						},
						{
							label: 15,
							value: 15,
						},
					]}
					onChange={(value: number) => setPageSize(value)}
				></Select>
			</Flex>
			<PaginationTable columns={columns} dataSource={reports} pageSize={pageSize}></PaginationTable>
		</div>
	);
}

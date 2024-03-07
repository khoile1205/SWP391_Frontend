import { CoffeeOutlined, CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Column } from "@/types/@override/Table";
import { useGetAllReports } from "@/hooks/admin";
import { Report } from "@/models/report.model";
import { ActionStatus } from "@/enums";
import { ReportType } from "@/enums/report.type.enum";
import React, { useState } from "react";
import { PaginationTable, PaginationPageSize } from "@/ui/components";
import { Tooltip, Typography, Flex, Button, Modal } from "antd";
import AppColor from "@/utils/appColor";
import { useAuthenticateFeature } from "@/hooks/common";

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

type ConfirmModalType = ActionStatus.ACCEPTED | ActionStatus.REJECTED;
export default function AdminReportPage() {
	const { reportData, handleAdminReport } = useGetAllReports();
	const [reportHandle, setReportHandle] = useState<Report>();
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [modalType, setModalType] = useState<ConfirmModalType>(ActionStatus.ACCEPTED);
	const [pageSize, setPageSize] = React.useState<number>(5);
	const [isModalVisible, setIsModalVisible] = useState(false);

	// Event handler
	const showModal = (message: string, modalType: ConfirmModalType, report: Report) => {
		setConfirmationMessage(message);
		setModalType(modalType);
		setIsModalVisible(true);
		setReportHandle(report);
	};

	const handleOk = useAuthenticateFeature(async () => {
		await handleAdminReport({
			adminAction: modalType == ActionStatus.ACCEPTED ? 0 : 1,
			content: `Report ${reportHandle!.id} has been ${modalType == ActionStatus.ACCEPTED ? "accepted" : "rejected"}`,
			reportId: reportHandle!.id,
			title: "Report Action",
		});
		// Your logic when the user clicks OK
		setIsModalVisible(false);
	});

	const handleCancel = () => {
		// Your logic when the user cancels or clicks outside the modal
		setIsModalVisible(false);
	};

	const columns: Column<Report>[] = [
		{
			title: "User",
			dataIndex: "user",
			render: (_text: string, record: Report) => (
				<Tooltip title={record.user.firstName + " " + record.user.lastName}>
					{record.user.firstName + " " + record.user.lastName}
				</Tooltip>
			),
			align: "center",
		},
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
		{
			title: "",
			align: "center",
			render: (_text: string, record: Report) => (
				<Flex justify="center" className="space-x-3">
					<Button
						type="primary"
						style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
						onClick={() =>
							showModal("Are you sure you want to accept?", ActionStatus.ACCEPTED, record)
						}
						disabled={record.status != ActionStatus.PENDING}
					>
						Accept
					</Button>
					<Button
						type="primary"
						style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
						onClick={() =>
							showModal("Are you sure you want to reject?", ActionStatus.REJECTED, record)
						}
						disabled={record.status != ActionStatus.PENDING}
					>
						Reject
					</Button>
				</Flex>
			),
		},
	];

	return (
		<div className="w-100vh flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">Admin Recipe Management</h2>

			<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
			<PaginationTable columns={columns} dataSource={reportData} pageSize={pageSize} />
			<Modal
				title="Confirmation"
				open={isModalVisible}
				onOk={handleOk}
				okButtonProps={{
					style: {
						backgroundColor: modalType == ActionStatus.ACCEPTED ? AppColor.greenColor : "#ff4d4f",
					},
				}}
				okText="Confirm"
				onCancel={handleCancel}
			>
				<p>{confirmationMessage}</p>
			</Modal>
		</div>
	);
}

import { Button, Tooltip, Flex, Typography, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ConfirmModal, PaginationPageSize, PaginationTable } from "@/ui/components";
import { useEffect, useState } from "react";
import { Column } from "@/types/@override/Table";
import { ActionStatus } from "@/enums";
import { BecomeChefRequestDetailModal } from "@/ui/section";
import { showToast } from "@/utils/notify";
import { useAdminBecomeChefManagement } from "@/hooks/admin";
import { BecomeChefRequest } from "@/models/become-chef-request.model";
import { renderStatusColor } from "@/ui/utils/renderStatusColor";
import AppColor from "@/utils/appColor";

export default function AdminBookingChefRequestManagementPage() {
	const { data, verifyBecomeChefRequests } = useAdminBecomeChefManagement();

	const [listRequest, setListRequest] = useState<BecomeChefRequest[]>(data);
	const [pageSize, setPageSize] = useState<number>(5);
	const [open, setOpen] = useState<boolean>(false);
	const [request, setRequest] = useState<BecomeChefRequest | null>(null);
	useEffect(() => {
		setListRequest(data);
	}, [data]);

	const handleSearchUser = (title: string) => {
		const searchKey = title.toLowerCase();
		if (title) {
			const newData = data.filter(
				(user: any) =>
					user.userName.toLowerCase().includes(searchKey) ||
					`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchKey)
			);
			setListRequest(newData);
		} else {
			setListRequest(data);
		}
	};

	const handleActionRequest = async (request: BecomeChefRequest, status: ActionStatus) => {
		const response = await verifyBecomeChefRequests({
			requestId: request.requestChefId,
			status: status,
		});

		if (response.isSuccess) {
			showToast("success", response.message as string);
			const newData = listRequest.map((req) =>
				req.requestChefId === request.requestChefId ? { ...req, status: status } : req
			);
			setListRequest(newData);
		} else {
			showToast("error", response.message as string);
		}
	};

	// Event handler
	const handleClickAcceptedButton = (record: BecomeChefRequest) => {
		ConfirmModal({
			content: "Are you sure to accept this request?",
			onOk: () => handleActionRequest(record, ActionStatus.ACCEPTED),
		});
	};

	const handleClickRejectedButton = (record: BecomeChefRequest) => {
		ConfirmModal({
			content: "Are you sure to reject this user?",
			onOk: () => handleActionRequest(record, ActionStatus.REJECTED),
		});
	};

	const handleViewDetail = (record: BecomeChefRequest) => {
		setRequest(record);
		setOpen(true);
	};

	const columns: Column<BecomeChefRequest>[] = [
		{
			title: "User",
			dataIndex: "fullName",
			width: "20%",
			align: "center",
			render: (_text: string, record: BecomeChefRequest) => (
				<Tooltip title={`${record.fullName}`}>{`${record.fullName}`}</Tooltip>
			),
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			width: "12%",
			align: "center",
			render: (_text: string, record: BecomeChefRequest) => (
				<Typography>{record.phoneNumber}</Typography>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			width: "10%",
			align: "center",
			render: (_text: string, record: BecomeChefRequest) => (
				<Typography
					style={{
						color: renderStatusColor(record.status),
					}}
				>
					{record.status}
				</Typography>
			),
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			width: "10%",
			render: (createdAt: Date) => (
				<Typography>{new Date(createdAt).toLocaleDateString("vi-VN")}</Typography>
			),
		},
		{
			title: "Action",
			align: "center",
			width: "13%",

			render: (_text: any, record: BecomeChefRequest) => (
				<Flex justify="center" className="space-x-3">
					<Button
						type="default"
						style={{
							backgroundColor:
								record.status == ActionStatus.PENDING ? AppColor.greenColor : "inherit",
							color: record.status == ActionStatus.PENDING ? "white" : "#ccc",
						}}
						onClick={() => handleClickAcceptedButton(record)}
						disabled={record.status != ActionStatus.PENDING}
					>
						Accept
					</Button>
					<Button
						type="default"
						style={{
							backgroundColor:
								record.status == ActionStatus.PENDING ? AppColor.redColor : "inherit",
							color: record.status == ActionStatus.PENDING ? "white" : "#ccc",
						}}
						className=""
						onClick={() => handleClickRejectedButton(record)}
						disabled={record.status != ActionStatus.PENDING}
					>
						Reject
					</Button>
				</Flex>
			),
		},
		{
			title: "",
			align: "center",
			width: "13%",

			render: (_text: any, record: BecomeChefRequest) => (
				<Flex justify="center" className="space-x-1">
					<Tooltip title="View Detail">
						<Button
							type="text"
							icon={<EyeOutlined className="text-primary" style={{ fontSize: "16px" }} />}
							onClick={() => handleViewDetail(record)}
						/>
					</Tooltip>
				</Flex>
			),
		},
	];

	return (
		<>
			{" "}
			<div className="w-full px-4 py-8 lg:px-8">
				<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
					Become Chef Request Management
				</h2>

				<Flex className="mb-4" align="center" justify="space-between">
					<Flex align="center" className="space-x-3">
						<Typography.Text>Search </Typography.Text>
						<span>
							<Input
								type="text"
								size="small"
								placeholder="Search user ..."
								className="focus:border-blue-500 rounded-md border-gray-300 px-3 py-1 focus:outline-none"
								onChange={(e) => handleSearchUser(e.target.value)}
							/>
						</span>
					</Flex>
					<PaginationPageSize
						options={[5, 10, 15]}
						pageSize={pageSize}
						setPageSize={setPageSize}
					></PaginationPageSize>
				</Flex>
				<PaginationTable columns={columns} dataSource={listRequest} pageSize={pageSize} />
			</div>
			{request && <BecomeChefRequestDetailModal request={request} open={open} setOpen={setOpen} />}
		</>
	);
}

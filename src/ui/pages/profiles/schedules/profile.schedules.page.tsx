import { Booking } from "@/models/booking.model";
import AppColor from "@/utils/appColor";
import { PaginationPageSize, PaginationTable } from "@/ui/components";
import userStore from "@/zustand/user.store";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip, Typography, Button } from "antd";
import { useGetChefSchedules } from "@/hooks/booking";
import bookingStore from "@/zustand/booking.store";
import { useAuthenticateFeature } from "@/hooks/common";
import { ActionStatus, Roles } from "@/enums";
import { Column } from "@/types/@override/Table";
import { BookingDetailModal } from "@/ui/section";
import { showToast } from "@/utils/notify";

const renderStatusColor = (status: ActionStatus) => {
	switch (status) {
		case ActionStatus.PENDING:
			return AppColor.deepOrangeColor;
		case ActionStatus.REJECTED:
			return AppColor.redColor;
		case ActionStatus.ACCEPTED:
			return AppColor.greenColor;
		case ActionStatus.CANCELED:
			return AppColor.redColor;
		case ActionStatus.COMPLETED:
			return AppColor.greenColor;
	}
};

export default function ProfileChefSchedulesHistory() {
	const { getBookingDetailById } = bookingStore((state) => state);
	const { updateBookingStatus } = bookingStore((state) => state);

	const { user } = userStore((state) => state);
	const { data } = useGetChefSchedules(user!.id as string);
	const [listBookings, setListBookings] = React.useState<Booking[]>(data);
	const [booking, setBooking] = React.useState<Booking>();
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		setListBookings(data);
	}, [data]);

	const [pageSize, setPageSize] = React.useState<number>(5);

	const handleUpdateBookingStatus = useAuthenticateFeature(async (status: ActionStatus) => {
		const data = {
			bookingId: booking?.id as string,
			status: status,
		};

		const response = await updateBookingStatus(data);
		if (response.isSuccess) {
			showToast("success", response.message as string);
			setOpenModal(false);
			setListBookings((prev) =>
				prev.map((booking) =>
					booking.id === data.bookingId ? { ...booking, status: status } : booking
				)
			);
		} else {
			showToast("error", response.message as string);
		}
	});
	const handleViewDetailBooking = useAuthenticateFeature(async (booking: Booking) => {
		const response = await getBookingDetailById(booking.id);
		if (response.isSuccess) setBooking(response.data);
		setOpenModal(true);
	});

	const columns: Column<Booking>[] = [
		{
			title: "ID",
			dataIndex: "id",
			align: "center",
			width: "20%",
		},
		{
			title: "User",
			dataIndex: "user",
			align: "center",
			render: (_text: string, record: Booking) => {
				const userFullname = record.user.firstName + " " + record.user.lastName;
				return <Tooltip title={userFullname}>{userFullname}</Tooltip>;
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status: Booking["status"]) => (
				<Typography
					style={{
						color: renderStatusColor(status),
					}}
				>
					{status}
				</Typography>
			),
			align: "center",
			filters: [
				{ text: "Accepted", value: ActionStatus.ACCEPTED },
				{ text: "Pending", value: ActionStatus.PENDING },
				{ text: "Rejected", value: ActionStatus.REJECTED },
				{ text: "Canceled", value: ActionStatus.CANCELED },
				{ text: "Completed", value: ActionStatus.COMPLETED },
			],
			onFilter: (value: any, record: Booking) => record.status === value,
		},
		{
			title: "Time Start",
			dataIndex: "timeStart",
			align: "center",
			render: (tiemStart: Date) => <span>{new Date(tiemStart).toLocaleString("vi-VN")}</span>,
			sorter: (a: Booking, b: Booking) =>
				new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime(),
		},
		{
			title: "Time Start",
			dataIndex: "timeEnd",
			align: "center",
			render: (timeEnd: Date) => <span>{new Date(timeEnd).toLocaleString("vi-VN")}</span>,
			sorter: (a: Booking, b: Booking) =>
				new Date(a.timeEnd).getTime() - new Date(b.timeEnd).getTime(),
		},
		{
			title: "Actions",
			align: "center",
			render: (_text: any, record: Booking) => (
				<Tooltip title="View Detail Booking">
					<Button
						type="text"
						icon={<EyeOutlined style={{ fontSize: "16px", color: AppColor.deepOrangeColor }} />}
						onClick={() => handleViewDetailBooking(record)}
					/>
				</Tooltip>
			),
		},
	];

	return (
		<>
			<div className="flex flex-col items-center justify-center px-4 py-8 lg:px-8">
				<h2 className="mb-4 text-2xl font-bold text-gray-900">View Schedule </h2>
				<div className="mb-4 ms-4 w-full">
					<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
				</div>
				<PaginationTable columns={columns} dataSource={listBookings} pageSize={pageSize} />
			</div>
			<BookingDetailModal
				open={openModal}
				setOpen={setOpenModal}
				bookingData={booking}
				role={Roles.CHEF}
				handleUpdateBookingStatus={handleUpdateBookingStatus}
			/>
		</>
	);
}

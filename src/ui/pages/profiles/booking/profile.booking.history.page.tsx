import { Booking } from "@/models/booking.model";
import { ActionStatus, Roles } from "@/enums";
import AppColor from "@/utils/appColor";
import { PaginationPageSize, PaginationTable } from "@/ui/components";
import { useGetUserBookings } from "@/hooks/profiles/useGetUserBookings";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip, Typography, Button, Flex } from "antd";
import { Column } from "@/types/@override/Table";
import { BookingDetailModal } from "@/ui/section";
import { useAuthenticateFeature } from "@/hooks/common";
import bookingStore from "@/zustand/booking.store";
import { renderStatusColor } from "@/ui/utils/renderStatusColor";

export default function ProfileUserBookingHistory() {
	const { getBookingDetailById } = bookingStore((state) => state);

	const { data } = useGetUserBookings();
	const [pageSize, setPageSize] = React.useState<number>(5);
	const [listBookings, setListBookings] = React.useState<Booking[]>(data);
	const [booking, setBooking] = React.useState<Booking>();
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		setListBookings(data);
	}, [data]);

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
			width: "30%",
		},
		{
			title: "Chef",
			dataIndex: "chef",
			align: "center",
			width: "15%",
			render: (_text: string, record: Booking) => {
				const chefFullName = record.chef.firstName + " " + record.chef.lastName;
				return <Tooltip title={chefFullName}>{chefFullName}</Tooltip>;
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
			],
			onFilter: (value: any, record: Booking) => record.status === value,
		},
		{
			title: "Time Start",
			dataIndex: "timeStart",
			align: "center",
			render: (tiemStart: Date) => <span>{new Date(tiemStart).toLocaleString("vi-VN")}</span>,
			sorter: (a: Booking, b: Booking) => a.createdAt.getTime() - b.createdAt.getTime(),
		},
		{
			title: "Time Start",
			dataIndex: "timeEnd",
			align: "center",
			render: (timeEnd: Date) => <span>{new Date(timeEnd).toLocaleString("vi-VN")}</span>,
			sorter: (a: Booking, b: Booking) => a.createdAt.getTime() - b.createdAt.getTime(),
		},
		{
			title: "Actions",
			align: "center",
			render: (_text: any, record: Booking) => (
				<Button
					type="text"
					icon={<EyeOutlined style={{ fontSize: "16px", color: AppColor.deepOrangeColor }} />}
					onClick={() => handleViewDetailBooking(record)}
				/>
			),
		},
	];

	return (
		<>
			<div className="w-full px-4 py-8 lg:px-8">
				<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">View Bookings</h2>
				<Flex className="mb-4 w-full" align="center" justify="space-between">
					<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
				</Flex>
				<PaginationTable columns={columns} dataSource={listBookings} pageSize={pageSize} />
			</div>

			<BookingDetailModal
				open={openModal}
				setOpen={setOpenModal}
				bookingData={booking}
				role={Roles.USER}
			/>
		</>
	);
}

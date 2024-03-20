import { ActionStatus, Roles } from "@/enums";
import { Booking, BookingRecipes } from "@/models/booking.model";
import { ConfirmModal } from "@/ui/components";
import { renderStatusColor } from "@/ui/utils/renderStatusColor";
import AppColor from "@/utils/appColor";
import { Button, Divider, Image, Modal, Space, Table, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

interface Props {
	open: boolean;
	bookingData: Booking | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	role: Roles;
	handleUpdateBookingStatus?: (status: ActionStatus) => void;
}

const handleCloseButton = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
	<Button key="close" type="default" onClick={() => setOpen(false)}>
		Close
	</Button>
);

const handleChefButtons = (
	bookingData: Booking,
	handleUpdateBookingStatus: (status: ActionStatus) => void
) => {
	const isPending = bookingData.status === ActionStatus.PENDING;
	const isAccepted = bookingData.status === ActionStatus.ACCEPTED;

	if (isAccepted) {
		return (
			<>
				<Button
					key="cancel"
					type="default"
					style={{ backgroundColor: AppColor.redColor, color: "white" }}
					onClick={() =>
						ConfirmModal({
							content: "Are you sure to cancel this booking?",
							onOk: () => handleUpdateBookingStatus(ActionStatus.CANCELED),
						})
					}
				>
					Canceled booking
				</Button>
				<Button
					key="complete"
					type="default"
					style={{ backgroundColor: AppColor.greenColor, color: "white" }}
					onClick={() =>
						ConfirmModal({
							content: "Are you sure to complete this booking?",
							onOk: () => handleUpdateBookingStatus(ActionStatus.COMPLETED),
						})
					}
				>
					Complete booking
				</Button>
			</>
		);
	} else {
		return (
			<>
				<Button
					key="reject"
					type="default"
					style={{
						backgroundColor: AppColor.redColor,
						color: "white",
						opacity: isPending ? 1 : 0.5,
					}}
					disabled={!isPending}
					onClick={() =>
						ConfirmModal({
							content: "Are you sure to reject this booking?",
							onOk: () => handleUpdateBookingStatus(ActionStatus.REJECTED),
						})
					}
				>
					Reject
				</Button>
				<Button
					key="approve"
					type="default"
					style={{
						backgroundColor: AppColor.greenColor,
						color: "white",
						opacity: isPending ? 1 : 0.5,
					}}
					disabled={!isPending}
					onClick={() =>
						ConfirmModal({
							content: (
								<>
									<p>Are you sure to approve this booking?</p>
									<Text type="danger" className="!text-xs">
										Warning: You need to have at least 20% total price of booking to approve this
										booking!
									</Text>
								</>
							),
							onOk: () => handleUpdateBookingStatus(ActionStatus.ACCEPTED),
						})
					}
				>
					Approve
				</Button>
			</>
		);
	}
};

export const BookingDetailModal: React.FC<Props> = ({
	open,
	bookingData,
	setOpen,
	role,
	handleUpdateBookingStatus,
}) => {
	return (
		bookingData && (
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				title="Booking Detail"
				centered
				width={600}
				footer={[
					handleCloseButton(setOpen),
					role === Roles.CHEF && handleChefButtons(bookingData, handleUpdateBookingStatus!),
				].filter(Boolean)}
			>
				<div className="p-4">
					<Title level={4}>Booking Information</Title>
					<Divider />
					<div className="flex flex-col space-y-4">
						{
							<div>
								<Text strong>{role == Roles.CHEF ? "User: " : "Chef: "}</Text>
								<Typography.Link
									href={
										role == Roles.USER
											? `/user/${bookingData.chef.id}`
											: `/user/${bookingData.user.id}`
									}
								>
									{role == Roles.USER
										? `${bookingData.chef.firstName + " " + bookingData.chef.lastName}`
										: `${bookingData.user.firstName + " " + bookingData.user.lastName}`}
								</Typography.Link>
							</div>
						}
						<div>
							<Text strong>Address: </Text>
							<Text>{bookingData.address}</Text>
						</div>
						<div>
							<Text strong>Total: </Text>
							<Text>$ {bookingData.total}</Text>
						</div>
						<div>
							<Text strong>Status: </Text>
							<Text
								style={{
									color: renderStatusColor(bookingData.status),
								}}
							>
								{bookingData.status}
							</Text>
						</div>
						<Table dataSource={bookingData.bookingDishes} pagination={false}>
							<Table.Column
								title="Recipe Name"
								render={(record: BookingRecipes) => (
									<Space direction="vertical">
										<span style={{ fontWeight: "bold" }}>{"title"}</span>
										<Space
											direction="horizontal"
											style={{ fontSize: "12px", marginTop: "5px", color: "#999" }}
										>
											<span>Serves: {record.portion || "-"}</span>
											<span style={{ marginLeft: "10px" }}>
												Price: $ {record.bookingPrice || "-"}
											</span>
										</Space>
										<span style={{ fontSize: "12px", color: "#999" }}>Note: {record.note}</span>
									</Space>
								)}
							/>
							<Table.Column
								title="Image"
								key="thumbnailUrl"
								render={(record: BookingRecipes) => (
									<Image
										src={record.thumbnailUrl || "https://via.placeholder.com/150x100"}
										alt={record.title}
										style={{ width: "100%", height: "80px", objectFit: "cover" }}
									/>
								)}
							/>
						</Table>
					</div>
				</div>
			</Modal>
		)
	);
};

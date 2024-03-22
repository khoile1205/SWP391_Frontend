import { ActionStatus, Roles } from "@/enums";
import { Booking, BookingRecipes } from "@/models/booking.model";
import { ConfirmModal } from "@/ui/components";
import { renderStatusColor } from "@/ui/utils/renderStatusColor";
import AppColor from "@/utils/appColor";
import { Button, Divider, Image, Modal, Space, Table, Typography } from "antd";
import React from "react";
import { BookingDetailModalButton } from "./Component";
import { getFormattedDateString } from "@/utils/date_exts";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface Props {
	open: boolean;
	bookingData: Booking | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	role: Roles;
	handleUpdateBookingStatus?: (status: ActionStatus) => void;
}

const CloseButton = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
	<Button key="close" type="default" onClick={() => setOpen(false)}>
		Close
	</Button>
);

const renderCancelBookingText = (timeStart: Date | undefined) => {
	if (!timeStart) return "";

	const now = dayjs();
	const diffHours = dayjs(timeStart).diff(now, "hour");

	if (diffHours < 2) {
		return "Less than 2 hours: 75% money lost";
	} else if (diffHours <= 24) {
		return "2 hours to 1 day: 45% money lost";
	} else {
		return "More than 1 day: 20% money lost";
	}
};
export const BookingDetailModal: React.FC<Props> = ({
	open,
	bookingData,
	setOpen,
	role,
	handleUpdateBookingStatus,
}) => {
	const isChef = React.useMemo(() => role === Roles.CHEF, [role]);

	const isPending = React.useMemo(
		() => bookingData?.status === ActionStatus.PENDING,
		[bookingData]
	);
	const isAccepted = React.useMemo(
		() => bookingData?.status === ActionStatus.ACCEPTED,
		[bookingData]
	);

	const handleButtonAction = (status: ActionStatus) => {
		if (handleUpdateBookingStatus) {
			ConfirmModal({
				content: (
					<>
						<Typography>Are you sure to {status.toLowerCase()} this booking?</Typography>
						{status == ActionStatus.CANCELED && (
							<Typography className="text-xs">
								<span className="text-red-500">*</span>{" "}
								{renderCancelBookingText(bookingData?.timeStart)}
							</Typography>
						)}
					</>
				),
				onOk: () => handleUpdateBookingStatus(status),
			});
		}
	};

	const renderChefButtons = () => {
		if (isAccepted) {
			return (
				<BookingDetailModalButton
					actionStatus="CANCELED"
					handleButtonAction={handleButtonAction}
					text="Cancel booking"
					style={{ backgroundColor: AppColor.redColor }}
				></BookingDetailModalButton>
				// <Button
				// 	key="cancel"
				// 	type="default"
				// 	style={{ backgroundColor: AppColor.redColor, color: "white" }}
				// 	onClick={() => handleButtonAction(ActionStatus.CANCELED)}
				// >
				// 	Cancel booking
				// </Button>
			);
		} else {
			return (
				<>
					<BookingDetailModalButton
						actionStatus="REJECTED"
						handleButtonAction={handleButtonAction}
						text="Reject"
						disabled={!isPending}
						style={{ backgroundColor: AppColor.redColor, opacity: isPending ? 1 : 0.5 }}
					></BookingDetailModalButton>
					<BookingDetailModalButton
						actionStatus="ACCEPTED"
						handleButtonAction={handleButtonAction}
						text="Approve"
						disabled={!isPending}
						style={{ backgroundColor: AppColor.greenColor, opacity: isPending ? 1 : 0.5 }}
					/>
				</>
			);
		}
	};

	const renderUserButtons = () => {
		if (isAccepted) {
			return (
				<>
					{/* <Button
						key="cancel"
						type="default"
						style={{ backgroundColor: AppColor.redColor, color: "white" }}
						onClick={() => handleButtonAction(ActionStatus.CANCELED)}
					>
						Cancel booking
					</Button>
					<Button
						key="complete"
						type="default"
						style={{ backgroundColor: AppColor.greenColor, color: "white" }}
						onClick={() => handleButtonAction(ActionStatus.COMPLETED)}
					>
						Complete booking
					</Button> */}
					<BookingDetailModalButton
						actionStatus="CANCELED"
						handleButtonAction={handleButtonAction}
						text="Cancel booking"
						disabled={!isAccepted}
						style={{ backgroundColor: AppColor.redColor, opacity: isAccepted ? 1 : 0.5 }}
					></BookingDetailModalButton>
					<BookingDetailModalButton
						actionStatus="COMPLETED"
						handleButtonAction={handleButtonAction}
						text="Complete booking"
						disabled={!isAccepted}
						style={{ backgroundColor: AppColor.greenColor, opacity: isAccepted ? 1 : 0.5 }}
					></BookingDetailModalButton>
				</>
			);
		} else {
			return (
				// <Button
				// 	key="cancel"
				// 	type="default"
				// 	style={{ backgroundColor: AppColor.redColor, color: "white" }}
				// 	onClick={() => handleButtonAction(ActionStatus.CANCELED)}
				// >
				// 	Cancel booking
				// </Button>
				<BookingDetailModalButton
					actionStatus="CANCELED"
					handleButtonAction={handleButtonAction}
					text="Cancel booking"
					disabled={!isPending}
					style={{ backgroundColor: AppColor.redColor, opacity: isPending ? 1 : 0.5 }}
				></BookingDetailModalButton>
			);
		}
	};

	return (
		bookingData && (
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				title="Booking Detail"
				centered
				width={600}
				footer={[CloseButton(setOpen), isChef ? renderChefButtons() : renderUserButtons()]}
			>
				<div className="p-4">
					<Title level={4}>Booking Information</Title>
					<Divider />
					<div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
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
							<Text strong>Phone number: </Text>
							<Text>{bookingData.phoneNumber}</Text>
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
						<div>
							<Text strong>Time Start: </Text>
							<Text>{getFormattedDateString(bookingData.timeStart)}</Text>
						</div>
						<div>
							<Text strong>Time End: </Text>
							<Text>{getFormattedDateString(bookingData.timeEnd)}</Text>
						</div>
						<div>
							<Text strong>Address: </Text>
							<Text>{bookingData.address}</Text>
						</div>
					</div>
					<Typography.Title level={5} className="mt-8">
						{" "}
						List Recipes:{" "}
					</Typography.Title>
					<Table dataSource={bookingData.bookingDishes} pagination={false}>
						<Table.Column
							title="Recipe Name"
							render={(record: BookingRecipes) => (
								<Space direction="vertical">
									<span style={{ fontWeight: "bold" }}>{record.title}</span>
									<Space
										direction="horizontal"
										style={{ fontSize: "12px", marginTop: "5px", color: "#999" }}
									>
										<span>Serves: {record.portion || "-"}</span>
										<span style={{ marginLeft: "10px" }}>
											Price: {`${record.bookingPrice}$` || "-"}
										</span>
									</Space>
									<span style={{ fontSize: "12px", color: "#999" }}>
										Note: {record.note ?? "No note anything"}
									</span>
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
			</Modal>
		)
	);
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { initialCreateBookingData } from "./utils";
import { List, Typography } from "antd";
import dayjs from "dayjs";
import AppColor from "@/utils/appColor";
import { Recipe } from "@/models/recipe.model";
import bookingStore from "@/zustand/booking.store";
import { useAuthenticateFeature } from "@/hooks/common";
import { showToast } from "@/utils/notify";
import { useLoadingStore } from "@/zustand/loading.store";

const BookingScreen: React.FC = () => {
	const { setLoading } = useLoadingStore((state) => state);
	const { createBooking } = bookingStore((state) => state);
	const [bookingInLocalStorage, setBookingInLocalStorage] = useLocalStorage(
		"cart",
		initialCreateBookingData
	);
	const navigate = useNavigate();

	const [agreed, setAgreed] = useState(false);

	const handleBooking = useAuthenticateFeature(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!bookingInLocalStorage.address) {
			showToast("error", "Please enter your address");
			return;
		}

		const createBookingData = {
			...bookingInLocalStorage,
			bookingDishes: bookingInLocalStorage.bookingDishes.map((item) => {
				return {
					recipeId: (item.recipeId as Recipe).id,
					quantity: item.quantity,
					note: item.note,
				};
			}),
		};
		setLoading(true);
		const response = await createBooking(createBookingData);
		if (response.isSuccess) {
			showToast("success", "Booking successfully");
			setBookingInLocalStorage(initialCreateBookingData);
			navigate("/");
		} else {
			showToast("error", response.message!);
		}
		setLoading(false);
	});

	return (
		<div
			className="booking-container"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				maxWidth: "600px",
				margin: "0 auto",
				padding: "20px",
				borderRadius: "8px",
				backgroundColor: "#f5f5f5",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
			}}
		>
			<h2
				className="title"
				style={{
					textAlign: "center",
					fontSize: "24px",
					color: "#333",
					fontWeight: "bold",
					marginBottom: "20px",
				}}
			>
				Booking Checkout
			</h2>

			<form className="booking-form" onSubmit={handleBooking}>
				<div className="form-group" style={{ marginBottom: "20px" }}>
					<Typography className="mb-2" style={{ fontWeight: "bold", display: "block" }}>
						Delivery Address:
					</Typography>
					<input
						type="text"
						id="address"
						value={bookingInLocalStorage.address}
						required
						readOnly
						style={{
							width: "100%",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input px-5 py-2"
					/>
				</div>
				<div className="form-group" style={{ marginBottom: "20px" }}>
					<Typography className="mb-2" style={{ fontWeight: "bold", display: "block" }}>
						Delivery Phone number:
					</Typography>
					<input
						type="text"
						id="address"
						value={bookingInLocalStorage.phoneNumber}
						required
						readOnly
						style={{
							width: "100%",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input px-5 py-2"
					/>
				</div>
				<div className="form-group" style={{ marginBottom: "20px" }}>
					<Typography className="mb-2" style={{ fontWeight: "bold", display: "block" }}>
						Date Time Start:
					</Typography>
					<input
						type="datetime"
						value={dayjs(bookingInLocalStorage.timeStart).format("HH:mm A - DD-MM-YYYY")}
						readOnly
						style={{
							width: "100%",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input px-5 py-2"
					/>
				</div>

				<div className="form-group" style={{ marginBottom: "20px" }}>
					<Typography style={{ fontWeight: "bold", display: "block" }}>Date Time End: :</Typography>

					<input
						type="datetime"
						value={dayjs(bookingInLocalStorage.timeEnd).format("HH:mm A - DD-MM-YYYY")}
						readOnly
						style={{
							width: "100%",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input px-5 py-2"
					/>
				</div>

				<div className="form-group" style={{ marginBottom: "20px" }}>
					<Typography.Title level={5} style={{ fontWeight: "bold", display: "block" }}>
						List of Food Ordered :
					</Typography.Title>

					<List className="food-list" style={{ listStyleType: "none", padding: "0", margin: "0" }}>
						{bookingInLocalStorage.bookingDishes &&
						bookingInLocalStorage.bookingDishes.length > 0 ? (
							bookingInLocalStorage.bookingDishes.map((data) => (
								<li
									key={(data.recipeId as Recipe).id}
									className="food-item"
									style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}
								>
									<div>
										<Typography.Text className="mb-1">
											Name: {(data.recipeId as Recipe).title}
										</Typography.Text>
										<Typography style={{ fontSize: "12px", color: "#666", marginLeft: "4px" }}>
											Note: {data.note && data.note !== "" ? data.note : "No note"}
										</Typography>{" "}
									</div>
									<Typography>x{data.quantity || 1}</Typography>
								</li>
							))
						) : (
							<li>No items selected</li>
						)}
					</List>
				</div>

				<div className="summary" style={{ padding: "20px", borderTop: "1px solid #ddd" }}>
					<div
						className="summary-item"
						style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
					>
						<Typography.Text className="label" style={{ fontWeight: "bold" }}>
							Total Price:
						</Typography.Text>
						<Typography>$ {bookingInLocalStorage.total.toFixed(2)}</Typography>
					</div>
					{/* <div
						className="summary-item"
						style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
					>
						<Typography className="label" style={{ fontWeight: "bold" }}>
							Fees Apply (20%):
						</Typography>
						<Typography>$ {fees.toFixed(2)}</Typography>
					</div>
					<div
						className="summary-item total"
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<Typography className="label" style={{ fontWeight: "bold" }}>
							Total Money:
						</Typography>
						<Typography>
							<b>$ {totalMoney.toFixed(2)}</b>
						</Typography>
					</div> */}
				</div>

				<div
					className="form-group"
					style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
				>
					<Typography>
						<input
							type="checkbox"
							checked={agreed}
							onChange={(e) => setAgreed(e.target.checked)}
							style={{ marginRight: "10px", color: AppColor.deepOrangeColor }}
							className="checkbox"
						/>
						I agree to NestCooking's User Agreement and Privacy Policy
					</Typography>
				</div>

				<button
					type="submit"
					disabled={!agreed || bookingInLocalStorage.bookingDishes.length == 0}
					className={`btn ${!agreed || bookingInLocalStorage.bookingDishes.length == 0 ? "btn-disabled" : "btn-enabled"}`}
					style={{
						backgroundColor:
							!agreed || bookingInLocalStorage.bookingDishes.length == 0
								? "#ccc"
								: AppColor.deepOrangeColor,
						color: "#fff",
						padding: "12px 20px",
						borderRadius: "4px",
						border: "none",
						transition: "background-color 0.3s ease-in-out",
						fontSize: "16px",
						width: "100%",
					}}
				>
					Book Now
				</button>
			</form>
		</div>
	);
};

export default function BookingCheckoutPage() {
	return (
		<div>
			<BookingScreen />
		</div>
	);
}

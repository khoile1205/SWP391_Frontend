import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dish } from "./booking-cart";

const BookingForm: React.FC = () => {
	const [address, setAddress] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const {
		dateTimeStart,
		dateTimeEnd,
		cartItems,
		notes,
	}: {
		dateTimeStart: Date | null;
		dateTimeEnd: Date | null;
		cartItems: Dish[];
		notes: { [key: number]: string };
	} = location.state || {};
	const [agreed, setAgreed] = useState(false);

	const totalDishPrice =
		cartItems && cartItems.length > 0
			? cartItems.reduce(
					(total: number, item: Dish) => total + item.price * (item.quantity || 1),
					0
				)
			: 0;
	const fees = totalDishPrice * 0.2;
	const totalMoney = totalDishPrice + fees;

	const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!address) {
			alert("Please enter your address.");
			return;
		}

		console.log("Booking data:", { address, dateTimeStart, dateTimeEnd, cartItems });
		navigate("/booking-checkout", {
			state: {
				address,
				dateTimeStart,
				dateTimeEnd,
				cartItems,
			},
		});
	};

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
					<label
						htmlFor="address"
						className="label"
						style={{ fontWeight: "bold", display: "block" }}
					>
						Delivery Address:
					</label>
					<input
						type="text"
						id="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
						style={{
							width: "100%",
							padding: "10px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input"
					/>
				</div>

				<div className="form-group" style={{ marginBottom: "20px" }}>
					<label
						htmlFor="datetime-start"
						className="label"
						style={{ fontWeight: "bold", display: "block" }}
					>
						Date Time Start:
					</label>
					<input
						type="datetime-local"
						id="datetime-start"
						value={dateTimeStart ? dateTimeStart.toISOString().slice(0, 16) : ""}
						readOnly
						style={{
							width: "100%",
							padding: "10px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input"
					/>
				</div>

				<div className="form-group" style={{ marginBottom: "20px" }}>
					<label
						htmlFor="datetime-end"
						className="label"
						style={{ fontWeight: "bold", display: "block" }}
					>
						Date Time End:
					</label>
					<input
						type="datetime-local"
						id="datetime-end"
						value={dateTimeEnd ? dateTimeEnd.toISOString().slice(0, 16) : ""}
						readOnly
						style={{
							width: "100%",
							padding: "10px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
						className="input"
					/>
				</div>

				<div className="form-group" style={{ marginBottom: "20px" }}>
					<label className="label" style={{ fontWeight: "bold" }}>
						List of Food Ordered:
					</label>
					<ul className="food-list" style={{ listStyleType: "none", padding: "0", margin: "0" }}>
						{cartItems && cartItems.length > 0 ? (
							cartItems.map((dish: Dish) => (
								<li
									key={dish.id}
									className="food-item"
									style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}
								>
									<div>
										<p>{dish.name}</p>
										<p style={{ fontSize: "14px", color: "#666" }}>{notes[dish.id]}</p>{" "}
									</div>
									<p>x{dish.quantity || 1}</p>
								</li>
							))
						) : (
							<li>No items selected</li>
						)}
					</ul>
				</div>

				<div className="summary" style={{ padding: "20px", borderTop: "1px solid #ddd" }}>
					<div
						className="summary-item"
						style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
					>
						<p className="label" style={{ fontWeight: "bold" }}>
							Dishes Price:
						</p>
						<p>${totalDishPrice.toFixed(2)}</p>
					</div>
					<div
						className="summary-item"
						style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
					>
						<p className="label" style={{ fontWeight: "bold" }}>
							Fees Apply (20%):
						</p>
						<p>${fees.toFixed(2)}</p>
					</div>
					<div
						className="summary-item total"
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<p className="label" style={{ fontWeight: "bold" }}>
							Total Money:
						</p>
						<p>
							<b>${totalMoney.toFixed(2)}</b>
						</p>
					</div>
				</div>

				<div
					className="form-group"
					style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
				>
					<label className="checkbox-label">
						<input
							type="checkbox"
							checked={agreed}
							onChange={(e) => setAgreed(e.target.checked)}
							style={{ marginRight: "10px" }}
							className="checkbox"
						/>
						I agree to NestCooking's User Agreement and Privacy Policy
					</label>
				</div>

				<button
					type="submit"
					disabled={!agreed}
					className={`btn ${agreed ? "btn-enabled" : "btn-disabled"}`}
					style={{
						backgroundColor: agreed ? "#007bff" : "#ccc",
						color: "#fff",
						padding: "12px 20px",
						borderRadius: "4px",
						border: "none",
						cursor: agreed ? "pointer" : "not-allowed",
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

export default BookingForm;

import React, { useState } from "react";
import PastaImage from "@/assets/Icon/pasta.jpg";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import { BiFork, BiNotepad } from "react-icons/bi";
import { Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface Chef {
	name: string;
	followers: number;
	avatarUrl: string;
}

export interface Dish {
	id: number;
	name: string;
	price: number;
	portion: string;
	imageUrl: string;
	quantity?: number;
	note?: string;
}

const BookingCart: React.FC = () => {
	const [dateTimeStart, setDateTimeStart] = useState<Date | null>(null);
	const [dateTimeEnd, setDateTimeEnd] = useState<Date | null>(null);
	const [cartItems, setCartItems] = useState<Dish[]>([]);
	const [showAllDishes, setShowAllDishes] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [notes, setNotes] = useState<{ [key: number]: string }>({});
	const navigate = useNavigate();
	const chef: Chef = {
		name: "John Doe",
		followers: 1000,
		avatarUrl: PastaImage,
	};

	const dishes: Dish[] = [
		{
			id: 1,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 2,
			name: "Grilled Salmon with Roasted Vegetables",
			price: 22.5,
			portion: "Serves 1",
			imageUrl: PastaImage,
		},
		{
			id: 3,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 4,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 5,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 6,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 7,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 8,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 9,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 10,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
		{
			id: 11,
			name: "Spaghetti Carbonara",
			price: 15.99,
			portion: "Serves 2",
			imageUrl: PastaImage,
		},
	];
	const handleCheckout = () => {
		const startDateTimeInput = document.getElementById("start-date") as HTMLInputElement | null;
		const endDateTimeInput = document.getElementById("end-date") as HTMLInputElement | null;

		if (
			!startDateTimeInput ||
			!startDateTimeInput.value ||
			!endDateTimeInput ||
			!endDateTimeInput.value
		) {
			alert("Please select start and end date & time before checking out.");

			const startDateTimeLabel = document.querySelector(
				"label[for=start-date]"
			) as HTMLLabelElement | null;
			const endDateTimeLabel = document.querySelector(
				"label[for=end-date]"
			) as HTMLLabelElement | null;

			if (
				startDateTimeLabel &&
				startDateTimeLabel.textContent &&
				!startDateTimeLabel.textContent.includes("*")
			) {
				startDateTimeLabel.style.color = "red";
				startDateTimeLabel.textContent += "*";
				startDateTimeLabel.textContent = startDateTimeLabel.textContent.replace(":", "").trim();
			}
			if (
				endDateTimeLabel &&
				endDateTimeLabel.textContent &&
				!endDateTimeLabel.textContent.includes("*")
			) {
				endDateTimeLabel.style.color = "red";
				endDateTimeLabel.textContent += "*";
				endDateTimeLabel.textContent = endDateTimeLabel.textContent.replace(":", "").trim();
			}

			if (startDateTimeInput) {
				startDateTimeInput.focus();
			}

			const dateTimeSection = document.getElementById("date-time-section");
			if (dateTimeSection) {
				dateTimeSection.scrollIntoView({ behavior: "smooth" });
			}

			return;
		}
		console.log("Selected Date Start:", dateTimeStart);
		console.log("Selected Date End:", dateTimeEnd);
		console.log("Cart Items:", cartItems);
		navigate("/booking-checkout", {
			state: {
				dateTimeStart,
				dateTimeEnd,
				cartItems,
				notes,
			},
		});
	};

	const handleAddNote = (dishId: number, note: string) => {
		setNotes({ ...notes, [dishId]: note });
	};

	const handleAddToCart = (dish: Dish) => {
		const existingItem = cartItems.find((item) => item.id === dish.id);

		if (existingItem) {
			setCartItems(
				cartItems.map((item) =>
					item.id === dish.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
				)
			);
		} else {
			const newCartItem = { ...dish, quantity: 1 };
			setCartItems([...cartItems, newCartItem]);
			setNotes({ ...notes, [dish.id]: "" });
		}
	};

	const handleRemoveFromCart = (dishId: number) => {
		setCartItems(cartItems.filter((item) => item.id !== dishId));
	};

	const handleQuantityChange = (dishId: number, change: number) => {
		setCartItems((prevCartItems) =>
			prevCartItems.map((item) =>
				item.id === dishId
					? { ...item, quantity: Math.max((item.quantity || 0) + change, 0) }
					: item
			)
		);
	};
	const handleMoreRecipes = () => {
		setShowAllDishes(true);
	};

	const getFilteredDishes = () => {
		if (!searchTerm) {
			return dishes.slice(0, showAllDishes ? undefined : 3);
		}

		const filteredDishes = dishes.filter((dish) =>
			dish.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return filteredDishes.slice(0, showAllDishes ? undefined : 3);
	};

	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};
	return (
		<div className="container" style={{ width: "100%", margin: "0 auto" }}>
			<div
				className="chef-info"
				style={{
					padding: "20px",
					backgroundColor: "#f5f5f5",
					borderRadius: "4px",
					marginBottom: "20px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						src={chef.avatarUrl}
						alt="Chef Avatar"
						style={{ width: "80px", height: "80px", borderRadius: "50%", marginRight: "20px" }}
					/>
					<div>
						<h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
							{chef.name}
						</h2>
						<p style={{ margin: "5px 0", fontSize: "16px", color: "#666" }}>
							<span style={{ fontWeight: "bold", color: "#cc9f66", marginRight: "5px" }}>
								{chef.followers}
							</span>{" "}
							followers
						</p>
					</div>
				</div>
				<div className="date-time-picker">
					<label htmlFor="start-date" style={{ fontWeight: "bold", marginBottom: "5px" }}>
						Date Time Start:
					</label>
					<input
						type="datetime-local"
						id="start-date"
						onChange={(e) => setDateTimeStart(new Date(e.target.value))}
						style={{
							padding: "8px",
							border: "1px solid #ddd",
							borderRadius: "4px",
							width: "100%",
							marginBottom: "10px",
						}}
					/>
					<label htmlFor="end-date" style={{ fontWeight: "bold", marginBottom: "5px" }}>
						Date Time End:
					</label>
					<input
						type="datetime-local"
						id="end-date"
						onChange={(e) => setDateTimeEnd(new Date(e.target.value))}
						style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
					/>
				</div>
				<div className="search-bar">
					<label
						htmlFor="search"
						style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
					>
						Search Recipes:
					</label>
					<Input
						type="text"
						id="search"
						placeholder="Search Recipes"
						value={searchTerm}
						onChange={handleSearch}
						style={{
							padding: "8px",
							border: "1px solid #ddd",
							borderRadius: "4px",
							width: "100%",
							marginBottom: "10px",
						}}
					/>
				</div>
			</div>

			<div
				className="menu"
				style={{ width: "100%", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}
			>
				<div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
					<BiFork style={{ width: "32px", height: "32px", marginRight: "10px" }} />
					<h2 style={{ margin: "0", fontSize: "32px", fontFamily: "cursive", color: "#333" }}>
						{chef.name}'s Menu
					</h2>
				</div>
				<div
					className="menu-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "20px",
					}}
				>
					{getFilteredDishes().map((dish) => (
						<div
							className="dish-item"
							key={dish.id}
							style={{
								backgroundColor: "#fff",
								boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
								borderRadius: "4px",
								padding: "20px",
							}}
						>
							<img
								src={dish.imageUrl}
								alt={dish.name}
								style={{
									width: "100%",
									height: "auto",
									objectFit: "cover",
									borderRadius: "4px",
									cursor: "pointer",
								}}
								onClick={() => window.open("your_recipe_link_here", "_blank")}
							/>
							<div className="dish-details">
								<h3 style={{ margin: "0", fontSize: "18px", color: "#333", marginTop: "10px" }}>
									{dish.name}
								</h3>
								<div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
									<TeamOutlined
										style={{ width: "16px", height: "16px", marginRight: "5px", color: "#666" }}
									/>
									<span style={{ fontSize: "14px", color: "#666" }}>{dish.portion}</span>
								</div>
								<p style={{ fontWeight: "bold" }}>${dish.price.toFixed(2)}</p>
								{cartItems.find((item) => item.id === dish.id) ? (
									<div style={{ display: "flex", alignItems: "center" }}>
										<button
											onClick={() => handleQuantityChange(dish.id, -1)}
											style={{
												backgroundColor: "#ddd",
												padding: "5px",
												marginRight: "10px",
												width: "50px",
												borderRadius: "4px",
											}}
										>
											-
										</button>
										<input
											type="number"
											value={cartItems.find((item) => item.id === dish.id)?.quantity || 0}
											onChange={(e) => {
												const newQuantity = parseInt(e.target.value);
												handleQuantityChange(
													dish.id,
													newQuantity -
														(cartItems.find((item) => item.id === dish.id)?.quantity || 0)
												);
											}}
											style={{
												width: "50px",
												padding: "5px",
												border: "1px solid #ddd",
												borderRadius: "4px",
											}}
										/>
										<button
											onClick={() => handleQuantityChange(dish.id, 1)}
											style={{
												backgroundColor: "#007bff",
												color: "#fff",
												padding: "5px",
												marginLeft: "10px",
												borderRadius: "4px",
												width: "50px",
											}}
										>
											+
										</button>
										<button
											onClick={() => handleRemoveFromCart(dish.id)}
											style={{
												backgroundColor: "transparent",
												border: "none",
												color: "#ccc",
												marginLeft: "10px",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<DeleteOutlined style={{ fontSize: "24px", color: "#454545" }} />
										</button>
									</div>
								) : (
									<button
										onClick={() => handleAddToCart(dish)}
										style={{
											backgroundColor: "#007bff",
											color: "#fff",
											padding: "8px 16px",
											borderRadius: "4px",
											border: "none",
										}}
									>
										Add to Cart
									</button>
								)}
								{cartItems.find((item) => item.id === dish.id) && (
									<div
										className="dish-notes"
										style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
									>
										<Input
											type="text"
											placeholder="Add a note"
											value={notes[dish.id] || ""}
											onChange={(e) => handleAddNote(dish.id, e.target.value)}
											prefix={<BiNotepad style={{ color: "rgba(0,0,0,.25)" }} />}
										/>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<div
				className="more-recipes-container"
				style={{ width: "100%", display: "flex", justifyContent: "center" }}
			>
				{dishes.length > getFilteredDishes().length && (
					<button
						className="more-recipes"
						onClick={handleMoreRecipes}
						style={{
							backgroundColor: "#cc9f66",
							color: "#fff9d1",
							padding: "8px 16px",
							borderRadius: "4px",
							border: "none",
							fontSize: "14px",
							cursor: "pointer",
							transition: "background-color 0.2s ease-in-out",
						}}
					>
						{showAllDishes ? "" : "More Recipes"}
					</button>
				)}
			</div>

			<div
				style={{
					width: "100%",
					margin: "20px auto",
					backgroundColor: "#f5f5f5",
					borderRadius: "4px",
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<p>
					<strong>Total: ${calculateTotal().toFixed(2)}</strong>
				</p>
				<button
					onClick={handleCheckout}
					disabled={cartItems.length === 0}
					style={{
						backgroundColor: cartItems.length === 0 ? "#ccc" : "#007bff",
						color: "#fff",
						padding: "10px 20px",
						borderRadius: "4px",
						border: "none",
						marginTop: "10px",
						cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
						transition: "background-color 0.3s ease-in-out",
					}}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default BookingCart;

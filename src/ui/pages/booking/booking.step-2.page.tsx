import React, { useState } from "react";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import { BiFork, BiNotepad } from "react-icons/bi";
import {
	Button,
	DatePicker,
	DatePickerProps,
	Flex,
	Form,
	Input,
	InputNumber,
	List,
	Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { ChefBookingEntity, ChefBookingSchedule, CreateBookingDTO } from "@/types/booking";
import { Recipe } from "@/models/recipe.model";
import AppColor from "@/utils/appColor";
import { Counter } from "@/ui/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetChefRecipes, useGetChefWorkingSchedule } from "@/hooks/booking";
import { isBetween, isInRange } from "@/utils/date_exts";
import { showToast } from "@/utils/notify";

const bookingInformationValidationSchema = Yup.object().shape({
	address: Yup.string().required("Address is required"),
	timeStart: Yup.date()
		.min(dayjs().add(2, "day").toDate(), "Time start should be at least 2 days from now")
		.required("Start time is required"),
	timeEnd: Yup.date()
		.min(Yup.ref("timeStart"), "End time should be after start time")
		.required("End time is required"),
});

interface Props {
	chefInformation: Omit<ChefBookingEntity, "listRecipes">;
	changeStep: (step: number) => void;
	bookingData: CreateBookingDTO;
	setBookingData: (data: Partial<CreateBookingDTO>) => void;
}

const BookingCart: React.FC<Props> = ({
	chefInformation,
	changeStep,
	setBookingData,
	bookingData,
}) => {
	const formik = useFormik({
		initialValues: {
			address: bookingData.address,
			timeStart: bookingData.timeStart,
			timeEnd: bookingData.timeEnd,
		},
		onSubmit: () => {
			setBookingData({
				address: bookingData.address,
				timeStart: bookingData.timeStart,
				timeEnd: bookingData.timeEnd,
			});
		},
		validationSchema: bookingInformationValidationSchema,
		enableReinitialize: true,
	});
	const { recipes, refetchListRecipes } = useGetChefRecipes(bookingData.chefId);
	React.useEffect(() => {
		if (bookingData.chefId) refetchListRecipes();
	}, [bookingData.chefId, refetchListRecipes]);

	const { data, refetchListChefSchedules } = useGetChefWorkingSchedule(bookingData.chefId);
	React.useEffect(() => {
		if (bookingData.chefId) refetchListChefSchedules();
	}, [bookingData.chefId, refetchListChefSchedules]);

	const [listRecipes, setListRecipes] = React.useState<Recipe[]>(recipes ?? []);
	const [listChefBookingSchedules, setListChefBookingSchedules] = React.useState<
		ChefBookingSchedule[]
	>(data ?? []);

	React.useEffect(() => {
		setListRecipes(recipes);
	}, [recipes]);

	React.useEffect(() => {
		setListChefBookingSchedules(data);
	}, [data]);

	const [showAllDishes, setShowAllDishes] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const disabledTime = (current: Dayjs, type: "start" | "end"): any => {
		// Initialize the disabled state
		const disabledHoursObj: Record<string, any> = {};

		if (!listChefBookingSchedules || listChefBookingSchedules.length === 0) {
			return disabledHoursObj;
		}

		const timeStart = dayjs(bookingData.timeStart);
		const startHour = timeStart.hour();
		const startMinute = timeStart.minute();

		if (type === "end") {
			const selectedDate = current.startOf("day").valueOf();
			const startDate = timeStart.startOf("day").valueOf();
			if (selectedDate === startDate) {
				// If the selected date is the same as the start date, disable times before the start time
				disabledHoursObj.disabledHours = () =>
					Array.from({ length: 24 }, (_, hour) => (hour < startHour + 1 ? hour : null));

				disabledHoursObj.disabledMinutes = (hour: number) =>
					hour <= startHour + 1
						? Array.from({ length: 60 }, (_, minute) => {
								return minute <= startMinute ? minute : null;
							})
						: [];
			}
		}

		for (const schedule of listChefBookingSchedules) {
			if (
				isBetween({
					startDate: schedule.timeStart,
					endDate: schedule.timeEnd,
					currentDate: current.toDate(),
				})
			) {
				// Disable all hours and minutes during the scheduled time
				const startMinute = dayjs(schedule.timeStart).minute();
				const startHour = dayjs(schedule.timeStart).hour();

				const endMinute = dayjs(schedule.timeEnd).minute();
				const endHour = dayjs(schedule.timeEnd).hour();

				disabledHoursObj.disabledHours = () =>
					Array.from({ length: 24 }, (_, hour) => startHour < hour && hour < endHour);

				disabledHoursObj.disabledMinutes = (hour: number) => {
					if (hour == startHour) {
						return Array.from({ length: 60 }, (_, minute) =>
							startMinute <= minute ? minute : null
						);
					}
					if (hour == endHour) {
						return Array.from({ length: 60 }, (_, minute) => (endMinute >= minute ? minute : null));
					}
					if (hour > startHour && hour < endHour) {
						return Array.from({ length: 60 }, (_, minute) => minute);
					}
				};
			}
		}

		return disabledHoursObj;
	};

	const handleCheckout = () => {
		if (!bookingData.timeStart || !bookingData.timeEnd) {
			alert("Please select start and end date & time before checking out.");
			return;
		}

		window.location.pathname = "/booking/checkout";
	};

	const handleAddNote = (recipeId: string, note: string) => {
		setBookingData({
			bookingDishes: bookingData.bookingDishes.map((item) =>
				(item.recipeId as Recipe).id === recipeId ? { ...item, note } : item
			),
			total: bookingData.total,
		});
	};

	const handleChangeTimeStart = (value: DatePickerProps["value"]) => {
		setBookingData({ timeStart: value?.toDate() });

		if (value && bookingData.timeEnd && value.toDate() > bookingData.timeEnd) {
			setBookingData({ timeEnd: new Date(value.toDate().getTime() + 60 * 60 * 1000) });
		}
	};

	const handleChangeTimeEnd = (value: DatePickerProps["value"]) => {
		const timeEnd = value?.toDate();
		let errorOccurred = false; // Flag to track if an error occurred

		listChefBookingSchedules.forEach((schedule) => {
			if (
				isBetween({
					startDate: schedule.timeStart,
					endDate: schedule.timeEnd,
					currentDate: timeEnd!,
				})
			) {
				console.log(schedule.timeStart, schedule.timeEnd, timeEnd);

				showToast("error", "Booking time must not be within the chef's schedule");
				errorOccurred = true; // Set flag to true if an error occurs
				return; // Exit the loop if an error occurs
			}

			// Check the range of time is between schedules
			if (
				isInRange({
					startRangeDate: bookingData.timeStart,
					endRangeDate: timeEnd!,
					startDateCheck: schedule.timeStart,
					endDateCheck: schedule.timeEnd,
				})
			) {
				console.log(2);

				showToast("error", "Booking time must not be within the chef's schedule");
				errorOccurred = true; // Set flag to true if an error occurs
				return; // Exit the loop if an error occurs
			}
		});

		if (!errorOccurred) {
			setBookingData({ timeEnd: timeEnd });
		} else {
			value = dayjs(bookingData.timeEnd);
		}
		return;
	};
	const handleAddToCart = (recipe: Recipe) => {
		setBookingData({
			bookingDishes: [
				...bookingData.bookingDishes,
				{
					note: "",
					recipeId: recipe,
					quantity: 1,
				},
			],
			total: bookingData.total + recipe.bookingPrice,
		});
	};

	const handleRemoveFromCart = (recipeId: string) => {
		const existingItem = bookingData.bookingDishes.find(
			(item) => (item.recipeId as Recipe).id === recipeId
		);

		if (existingItem) {
			const recipe = listRecipes.find((item) => item.id === recipeId);
			const bookingPrice = recipe?.bookingPrice ?? 0;

			setBookingData({
				bookingDishes: bookingData.bookingDishes.filter(
					(item) => (item.recipeId as Recipe).id !== recipeId
				),
				total: bookingData.total - existingItem.quantity * bookingPrice,
			});
		}
	};

	const handleQuantityChange = (recipeId: string, change: number) => {
		const existingItem = bookingData.bookingDishes.find(
			(item) => (item.recipeId as Recipe).id === recipeId
		);

		if (existingItem) {
			const recipe = listRecipes.find((item) => item.id === recipeId);
			const bookingPrice = recipe?.bookingPrice ?? 0;

			const newQuantity = Math.max(existingItem.quantity + change, 1);

			setBookingData({
				bookingDishes: bookingData.bookingDishes.map((item) =>
					(item.recipeId as Recipe).id === recipeId ? { ...item, quantity: newQuantity } : item
				),
				total: bookingData.total + (newQuantity - existingItem.quantity) * bookingPrice,
			});
		}
	};

	const handleChangeAddress = (address: string) => {
		setBookingData({ address });
	};
	const handleMoreRecipes = () => {
		setShowAllDishes(true);
	};

	const getFilteredDishes = () => {
		if (!searchTerm) {
			return listRecipes.slice(0, showAllDishes ? undefined : 3);
		}

		const filteredDishes = listRecipes.filter((dish) =>
			dish.title.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return filteredDishes.slice(0, showAllDishes ? undefined : 3);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="container" style={{ width: "100%", margin: "0 auto" }}>
			<Button className="bg-primary mb-3 text-white" onClick={() => changeStep(1)}>
				Back
			</Button>
			<div
				style={{
					padding: "20px",
					backgroundColor: "#f5f5f5",
					borderRadius: "4px",
					marginBottom: "20px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						src={
							chefInformation.avatarUrl ??
							"https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
						}
						alt="Chef Avatar"
						style={{ width: "80px", height: "80px", borderRadius: "50%", marginRight: "20px" }}
					/>
					<div>
						<h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
							{chefInformation.firstName + " " + chefInformation.lastName}
						</h2>
						<p style={{ margin: "5px 0", fontSize: "16px", color: "#666" }}>
							<span style={{ fontWeight: "bold", color: "#cc9f66", marginRight: "5px" }}>
								{chefInformation.followerCount}
							</span>{" "}
							followers
						</p>
					</div>
				</div>
				<Form className="mt-3 space-y-2" layout="vertical">
					<Form.Item
						validateStatus={formik.errors.address ? "error" : undefined}
						help={
							formik.errors.address &&
							formik.touched.address && <div className="my-3">{formik.errors.address}</div>
						}
						label={
							<Typography
								style={{
									fontSize: "16px",
									fontWeight: "bold",
									color: formik.errors.address ? "red" : "inherit",
								}}
								className="mb-1"
							>
								Your Address
							</Typography>
						}
					>
						<Input
							type="text"
							id="address"
							value={formik.values.address}
							placeholder="Your Address"
							onBlur={formik.handleBlur}
							onChange={(e) => {
								formik.setFieldValue("address", e.target.value);
								handleChangeAddress(e.target.value);
							}}
							required
							style={{
								width: "100%",
								border: `1px solid ${formik.errors.address ? "red" : "#ccc"}`,
								borderRadius: "4px",
							}}
							className="input px-5 py-1 !ring-0 focus:outline-0"
						/>
					</Form.Item>

					<Flex className="space-x-3">
						<div className="w-1/4">
							<Typography
								style={{
									fontSize: "16px",
									fontWeight: "bold",
									color: !bookingData.timeStart ? "red" : "inherit",
								}}
								className="mb-1"
							>
								Date Time Start:
							</Typography>
							<DatePicker
								size="large"
								superNextIcon={<BiNotepad />}
								showTime={{
									format: "HH:mm",
								}}
								// needConfirm={false}
								name="timeStart"
								className="w-full ps-4"
								minDate={dayjs(new Date()).add(2, "day")}
								defaultValue={dayjs(bookingData.timeStart)}
								format="YYYY-MM-DD HH:mm"
								disabledTime={(current: Dayjs) => disabledTime(current, "start")}
								onBlur={formik.handleBlur}
								onOk={handleChangeTimeStart}
								onChange={handleChangeTimeStart}
							></DatePicker>
						</div>
						<div className="!w-1/4">
							<Typography
								style={{
									fontSize: "16px",
									fontWeight: "bold",
									color: !bookingData.timeEnd ? "red" : "inherit",
								}}
								className="mb-1"
							>
								Date Time End:
							</Typography>
							<DatePicker
								size="large"
								className="w-full ps-4"
								name="timeEnd"
								// needConfirm={false}
								minDate={bookingData.timeStart ? dayjs(bookingData.timeStart) : undefined}
								disabled={!bookingData.timeStart}
								defaultValue={dayjs(bookingData.timeEnd)}
								disabledTime={(current: Dayjs) => disabledTime(current, "end")}
								showTime={{ format: "HH:mm" }}
								format="YYYY-MM-DD HH:mm"
								onBlur={formik.handleBlur}
								onOk={handleChangeTimeEnd}
								onChange={handleChangeTimeEnd}
							></DatePicker>
						</div>
					</Flex>
					<List header="Please check:">
						<div className="ms-4">
							<List.Item>
								<Typography.Text className="text-xs">
									<span className="!text-red-500">*</span> Please ensure that the address is
									correct.
								</Typography.Text>
							</List.Item>
							<List.Item>
								<Typography.Text className="text-xs">
									<span className="!text-red-500">*</span> Booking must be placed 2 days or more
									from now.
								</Typography.Text>
							</List.Item>
							<List.Item>
								<Typography.Text className="text-xs">
									<span className="!text-red-500">*</span> The booking time end must be greater than
									the booking time start
								</Typography.Text>
							</List.Item>
							<List.Item>
								<Typography.Text className=" text-xs">
									<span className="!text-red-500">*</span> Booking time must not be within the
									chef's schedule
								</Typography.Text>
							</List.Item>
							<List.Item>
								<Typography.Text className="text-xs">
									<span className="!text-red-500">*</span> Please ensure that the time interval
									between Time Start and 'Time End' is at least 1 hour.
								</Typography.Text>
							</List.Item>
						</div>
					</List>
				</Form>
			</div>

			<div
				className="menu"
				style={{
					width: "100%",
					padding: "20px",
					backgroundColor: "#f5f5f5",
					borderRadius: "4px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
					<BiFork style={{ width: "32px", height: "32px", marginRight: "10px" }} />
					<Typography.Title
						level={2}
						className=""
						style={{ margin: "0", fontSize: "32px", fontFamily: "cursive", color: "#333" }}
					>
						{chefInformation.firstName + " " + chefInformation.lastName}'s Menu
					</Typography.Title>
				</div>
				<div>
					<Flex className=" space-x-2" align="center">
						<Typography
							style={{
								fontSize: "16px",
								fontWeight: "bold",
								marginBottom: "5px",
								color: "#333",
							}}
						>
							Search Recipes:
						</Typography>
						<Input
							type="text"
							id="search"
							className="w-1/2 rounded-md px-3 py-1"
							placeholder="Search Recipes"
							value={searchTerm}
							onChange={handleSearch}
							style={{
								border: "1px solid #ddd",
								marginBottom: "10px",
							}}
						/>
					</Flex>
				</div>
				<div className="block sm:grid sm:grid-cols-2 lg:grid-cols-3">
					{listRecipes &&
						getFilteredDishes().map((dish) => (
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
								{/* Avatar */}
								<img
									src={dish.thumbnailUrl}
									alt={dish.title}
									style={{
										width: "100%",
										height: "auto",
										objectFit: "cover",
										borderRadius: "4px",
										cursor: "pointer",
									}}
									onClick={() => window.open(`/recipes/${dish.id}`, "_blank")}
								/>
								{/* Basic information */}
								<div className="">
									<Typography.Title
										level={3}
										style={{ margin: "0", fontSize: "18px", color: "#333", marginTop: "10px" }}
									>
										{dish.title}
									</Typography.Title>
									<div style={{ display: "flex", alignItems: "center" }} className="mt-2">
										<TeamOutlined
											style={{ width: "12px", height: "12px", marginRight: "5px", color: "#666" }}
										/>
										<Typography style={{ fontSize: "12px", color: "#666" }}>
											Portion: {dish.portion}
										</Typography>
									</div>
									<Typography style={{ fontWeight: "bold" }} className="my-2">
										Price: ${dish.bookingPrice}
									</Typography>
									{bookingData.bookingDishes &&
									bookingData.bookingDishes.find(
										(item) => (item.recipeId as Recipe).id === dish.id
									) ? (
										<div className="space-y-3">
											<div style={{ display: "flex", alignItems: "center" }} className="space-x-2">
												<Counter
													onChange={() => handleQuantityChange(dish.id, +1)}
													type="increment"
												></Counter>
												<InputNumber
													value={
														bookingData.bookingDishes.find(
															(item) => (item.recipeId as Recipe).id === dish.id
														)?.quantity || 0
													}
													onChange={(e) => {
														let newQuantity = e ?? 1;
														if (newQuantity <= 0) {
															newQuantity = 1;
														}
														handleQuantityChange(
															dish.id,
															newQuantity -
																(bookingData.bookingDishes.find(
																	(item) => (item.recipeId as Recipe).id === dish.id
																)?.quantity || 1)
														);
													}}
													min={1}
													style={{
														maxWidth: "50px",
														border: "1px solid #ddd",
														borderRadius: "4px",
													}}
													className=" text-center"
													inputMode="numeric"
												></InputNumber>
												<Counter
													onChange={() => handleQuantityChange(dish.id, -1)}
													type="decrement"
												/>
												<DeleteOutlined
													onClick={() => handleRemoveFromCart(dish.id)}
													style={{ fontSize: "16px" }}
												/>
											</div>
											<Input.TextArea
												className="border-1 border-gray"
												placeholder="Add a note"
												value={
													bookingData.bookingDishes.find(
														(item) => (item.recipeId as Recipe).id === dish.id
													)?.note || ""
												}
												onChange={(e) => handleAddNote(dish.id, e.target.value)}
												rows={2}
											/>
										</div>
									) : (
										<button
											onClick={() => handleAddToCart(dish)}
											className="px-4 py-1 "
											style={{
												backgroundColor: AppColor.deepOrangeColor,
												borderRadius: "4px",
												border: "none",
											}}
										>
											<Typography className="text-white">Add to Cart</Typography>
										</button>
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
				{listRecipes && listRecipes.length > getFilteredDishes().length && showAllDishes && (
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
						More Recipes
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
				<Typography.Text strong className="text-lg">
					Total: ${bookingData.total}
				</Typography.Text>
				<button
					onClick={handleCheckout}
					disabled={bookingData.bookingDishes && bookingData.bookingDishes.length <= 0}
					style={{
						backgroundColor:
							bookingData.bookingDishes && bookingData.bookingDishes.length <= 0
								? "#ccc"
								: AppColor.deepOrangeColor,
						borderRadius: "4px",
						border: "none",
						marginTop: "10px",
						cursor: bookingData.bookingDishes.length <= 0 ? "not-allowed" : "pointer",
						transition: "background-color 0.3s ease-in-out",
					}}
					className="px-5 py-2"
				>
					<Typography.Text strong className="text-white">
						Continue
					</Typography.Text>
				</button>
			</div>
		</div>
	);
};

export default BookingCart;

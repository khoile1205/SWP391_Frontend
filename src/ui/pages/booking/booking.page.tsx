import React from "react";
import ChefBooking from "./booking.step-1.page";
import BookingCart from "./booking.step-2.page";
import { ChefBookingEntity, CreateBookingDTO } from "@/types/booking";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { epochForMoreTwoDays, initialCreateBookingData } from "./utils";

export default function BookingForm() {
	const [, setBookingInLocalStorage] = useLocalStorage("cart", initialCreateBookingData);

	const [step, setStep] = React.useState<number>(1);
	const [bookingData, setCreateBookingData] =
		React.useState<CreateBookingDTO>(initialCreateBookingData);

	const [chefInformation, setChefInformation] = React.useState<Omit<
		ChefBookingEntity,
		"listRecipes"
	> | null>(null);

	// Check if there's a booking in localStorage
	useEffectOnce(() => {
		const storedBookingData = localStorage.getItem("cart");
		if (!storedBookingData) {
			// If there's no booking in localStorage, set initial booking data
			setBookingInLocalStorage(initialCreateBookingData);
		} else {
			const storedBookingDataJSONParse = JSON.parse(storedBookingData);
			const currentDate = new Date();

			// Convert stored dates to Date objects
			const storedTimeStart = new Date(storedBookingDataJSONParse.timeStart);
			const storedTimeEnd = new Date(storedBookingDataJSONParse.timeEnd);

			// Check if stored dates are from previous days
			if (
				storedTimeStart.getTime() < currentDate.getTime() + epochForMoreTwoDays + 60 * 60 * 1000 ||
				storedTimeEnd.getTime() < currentDate.getTime() + epochForMoreTwoDays + 2 * 60 * 60 * 1000
			) {
				// If stored dates are from previous days, set new dates

				const newTimeStart = new Date(new Date().getTime() + epochForMoreTwoDays + 60 * 60 * 1000);
				const newTimeEnd = new Date(
					new Date().getTime() + epochForMoreTwoDays + 2 * 60 * 60 * 1000
				); // Adding 2 hours to current time

				// Update booking data
				const updatedBookingData = {
					...storedBookingDataJSONParse,
					timeStart: newTimeStart,
					timeEnd: newTimeEnd,
				};

				// Update localStorage and state
				setBookingInLocalStorage(updatedBookingData);
				setCreateBookingData(updatedBookingData);
			} else {
				// If stored dates are for today, use them as they are
				setCreateBookingData(storedBookingDataJSONParse);
			}
		}
	});

	const handleSetCreateBookingData = (data: Partial<CreateBookingDTO>) => {
		setBookingInLocalStorage((prev) => ({ ...prev, ...data }));
		setCreateBookingData((prev) => ({ ...prev, ...data }));
	};

	const handleChangeStep = (step: number) => {
		setStep(step);
	};

	const handleSetChefInformation = (data: any) => {
		setChefInformation(data);
	};

	return step == 1 ? (
		<ChefBooking
			bookingData={bookingData}
			setBookingData={handleSetCreateBookingData}
			setChefInformation={handleSetChefInformation}
			changeStep={handleChangeStep}
		></ChefBooking>
	) : (
		<BookingCart
			chefInformation={chefInformation!}
			bookingData={bookingData}
			setBookingData={handleSetCreateBookingData}
			changeStep={handleChangeStep}
		></BookingCart>
	);
}

import React from "react";
import ChefBooking from "./booking.step-1.page";
import BookingCart from "./booking.step-2.page";
import { CreateBookingDTO } from "@/types/booking";

export default function BookingForm() {
	const [step, setStep] = React.useState<number>(1);
	const [, setCreateBookingData] = React.useState<CreateBookingDTO>({
		address: "",
		chefId: "",
		note: "",
		timeEnd: new Date(),
		timeStart: new Date(),
		listItems: [],
		total: 0,
	});

	const setChef = (data: Partial<CreateBookingDTO>) => {
		console.log(data);
		setCreateBookingData((prev) => ({ ...prev, ...data }));
	};

	const handleChangeStep = (step: number) => {
		setStep(step);
	};
	return step == 1 ? (
		<ChefBooking setChef={setChef} changeStep={handleChangeStep}></ChefBooking>
	) : (
		<BookingCart changeStep={handleChangeStep}></BookingCart>
	);
}

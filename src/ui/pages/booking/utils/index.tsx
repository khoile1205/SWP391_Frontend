import { CreateBookingDTO } from "@/types/booking";

export const epochForMoreTwoDays = 2 * 24 * 60 * 60 * 1000;

export const initialCreateBookingData: CreateBookingDTO = {
	address: "",
	chefId: "",
	timeStart: new Date(new Date().getTime() + epochForMoreTwoDays + 60 * 60 * 1000),
	timeEnd: new Date(new Date().getTime() + epochForMoreTwoDays + 2 * 60 * 60 * 1000),
	bookingDishes: [],
	total: 0,
};

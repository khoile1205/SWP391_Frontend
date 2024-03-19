import { create } from "zustand";
import Result from "./commons/result";
import { handleUseCase } from "./commons/handle.usecase";
import { bookingUsecase } from "@/usecases";
import { CreateBookingDTO } from "@/types/booking";

type Action = {
	getAllChefs: () => Promise<Result>;
	getChefRecipes: (chefId: string) => Promise<Result>;
	getChefSchedules: (chefId: string) => Promise<Result>;
	createBooking: (data: CreateBookingDTO) => Promise<Result>;
};

const bookingStore = create<Action>(() => ({
	getAllChefs: async () => await handleUseCase(bookingUsecase.getAllChefBookings()),
	getChefSchedules: async (chefId: string) =>
		await handleUseCase(bookingUsecase.getChefSchedule(chefId)),
	getChefRecipes: async (chefId: string) =>
		await handleUseCase(bookingUsecase.getAllChefRecipes(chefId)),
	createBooking: async (data: CreateBookingDTO) =>
		await handleUseCase(bookingUsecase.createBooking(data)),
}));

export default bookingStore;

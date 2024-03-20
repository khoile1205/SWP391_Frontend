import { create } from "zustand";
import Result from "./commons/result";
import { handleUseCase } from "./commons/handle.usecase";
import { bookingUsecase } from "@/usecases";
import { CreateBookingDTO, UpdateBookingDTO } from "@/types/booking";

type Action = {
	getAllChefs: () => Promise<Result>;
	getChefRecipes: (chefId: string) => Promise<Result>;
	getChefWorkingSchedule: (chefId: string) => Promise<Result>;
	createBooking: (data: CreateBookingDTO) => Promise<Result>;
	getUserBookings: () => Promise<Result>;
	getChefSchedules: () => Promise<Result>;
	getBookingDetailById: (id: string) => Promise<Result>;
	updateBookingStatus: (status: UpdateBookingDTO) => Promise<Result>;
};

const bookingStore = create<Action>(() => ({
	updateBookingStatus: async (status: UpdateBookingDTO) =>
		await handleUseCase(bookingUsecase.updateBookingStatus(status)),
	getBookingDetailById: async (id: string) =>
		await handleUseCase(bookingUsecase.getBookingDetailById(id)),
	getChefSchedules: async () => await handleUseCase(bookingUsecase.getChefSchedule()),
	getUserBookings: async () => await handleUseCase(bookingUsecase.getUserBookings()),
	getAllChefs: async () => await handleUseCase(bookingUsecase.getAllChefBookings()),
	getChefWorkingSchedule: async (chefId: string) =>
		await handleUseCase(bookingUsecase.getChefWorkingSchedule(chefId)),
	getChefRecipes: async (chefId: string) =>
		await handleUseCase(bookingUsecase.getAllChefRecipes(chefId)),
	createBooking: async (data: CreateBookingDTO) =>
		await handleUseCase(bookingUsecase.createBooking(data)),
}));

export default bookingStore;

import { BookingDatasource } from "@/datasources/booking.datasource";
import { CreateBookingDTO, UpdateBookingDTO } from "@/types/booking";
import Response from "@/usecases/auth.usecase/responses/response";

export abstract class BookingUsecase {
	abstract getAllChefBookings(): Promise<Response>;
	abstract getAllChefRecipes(chefId: string): Promise<Response>;
	abstract getChefWorkingSchedule(chefId: string): Promise<Response>;
	abstract createBooking(data: CreateBookingDTO): Promise<Response>;
	abstract getUserBookings(): Promise<Response>;
	abstract getChefSchedule(): Promise<Response>;
	abstract getBookingDetailById(id: string): Promise<Response>;
	abstract updateBookingStatus(data: UpdateBookingDTO): Promise<Response>;
}

export class BookingUsecaseImpl implements BookingUsecase {
	constructor(private readonly bookingDatasource: BookingDatasource) {}
	async updateBookingStatus(data: UpdateBookingDTO): Promise<Response> {
		return await this.bookingDatasource.updateStatusBooking(data);
	}
	async getBookingDetailById(id: string): Promise<Response> {
		return await this.bookingDatasource.getBookingDetailById(id);
	}
	async getChefSchedule(): Promise<Response> {
		return await this.bookingDatasource.getChefScheduleHistory();
	}
	async getUserBookings(): Promise<Response> {
		return await this.bookingDatasource.getUserBookings();
	}
	async createBooking(data: CreateBookingDTO): Promise<Response> {
		return await this.bookingDatasource.createBooking(data);
	}
	async getChefWorkingSchedule(chefId: string): Promise<Response> {
		return await this.bookingDatasource.getChefWorkingSchedule(chefId);
	}
	async getAllChefRecipes(chefId: string): Promise<Response> {
		return await this.bookingDatasource.getAllChefRecipes(chefId);
	}
	async getAllChefBookings(): Promise<Response> {
		return await this.bookingDatasource.getAllChefBookings();
	}
}

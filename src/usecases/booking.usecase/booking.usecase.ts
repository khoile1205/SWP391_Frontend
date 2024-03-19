import { BookingDatasource } from "@/datasources/booking.datasource";
import { CreateBookingDTO } from "@/types/booking";
import Response from "@/usecases/auth.usecase/responses/response";

export abstract class BookingUsecase {
	abstract getAllChefBookings(): Promise<Response>;
	abstract getAllChefRecipes(chefId: string): Promise<Response>;
	abstract getChefSchedule(chefId: string): Promise<Response>;
	abstract createBooking(data: CreateBookingDTO): Promise<Response>;
}

export class BookingUsecaseImpl implements BookingUsecase {
	constructor(private readonly bookingDatasource: BookingDatasource) {}
	async createBooking(data: CreateBookingDTO): Promise<Response> {
		return await this.bookingDatasource.createBooking(data);
	}
	async getChefSchedule(chefId: string): Promise<Response> {
		return await this.bookingDatasource.getChefSchedule(chefId);
	}
	async getAllChefRecipes(chefId: string): Promise<Response> {
		return await this.bookingDatasource.getAllChefRecipes(chefId);
	}
	async getAllChefBookings(): Promise<Response> {
		return await this.bookingDatasource.getAllChefBookings();
	}
}

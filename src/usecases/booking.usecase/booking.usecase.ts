import { BookingDatasource } from "@/datasources/booking.datasource";
import Response from "@/usecases/auth.usecase/responses/response";

export abstract class BookingUsecase {
	abstract getAllChefBookings(): Promise<Response>;
}

export class BookingUsecaseImpl implements BookingUsecase {
	constructor(private readonly bookingDatasource: BookingDatasource) {}
	async getAllChefBookings(): Promise<Response> {
		return await this.bookingDatasource.getAllChefBookings();
	}
}

import { CreateBookingDTO } from "@/types/booking";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

const API_Booking = "/api/bookings";
export abstract class BookingDatasource {
	abstract getAllChefBookings(): Promise<Response>;
	abstract getAllChefRecipes(chefId: string): Promise<Response>;
	abstract getChefSchedule(chefId: string): Promise<Response>;
	abstract createBooking(data: CreateBookingDTO): Promise<Response>;
}

export class BookingDatasourceImpl implements BookingDatasource {
	async createBooking(data: CreateBookingDTO): Promise<Response> {
		const response = await apiService.post(`${API_Booking}/create`, data);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getChefSchedule(chefId: string): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/chefs/${chefId}/schedules`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getAllChefRecipes(chefId: string): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/chefs/${chefId}/dishes`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getAllChefBookings(): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/chefs`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
}

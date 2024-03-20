import { CreateBookingDTO, UpdateBookingDTO } from "@/types/booking";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

const API_Booking = "/api/bookings";
export abstract class BookingDatasource {
	abstract getAllChefBookings(): Promise<Response>;
	abstract getAllChefRecipes(chefId: string): Promise<Response>;
	abstract getChefWorkingSchedule(chefId: string): Promise<Response>;
	abstract createBooking(data: CreateBookingDTO): Promise<Response>;
	abstract getUserBookings(): Promise<Response>;
	abstract getChefScheduleHistory(): Promise<Response>;
	abstract getBookingDetailById(bookingId: string): Promise<Response>;
	abstract updateStatusBooking(data: UpdateBookingDTO): Promise<Response>;
}

export class BookingDatasourceImpl implements BookingDatasource {
	async updateStatusBooking(data: UpdateBookingDTO): Promise<Response> {
		const response = await apiService.put(`${API_Booking}/update/status`, data);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getBookingDetailById(bookingId: string): Promise<Response> {
		const response = await apiService.get(`${API_Booking}?bookingId=${bookingId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getChefScheduleHistory(): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/chefs/my-booking`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getUserBookings(): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/my-booking`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async createBooking(data: CreateBookingDTO): Promise<Response> {
		const response = await apiService.post(`${API_Booking}/create`, data);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getChefWorkingSchedule(chefId: string): Promise<Response> {
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

import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

const API_Booking = "/api/bookings";
export abstract class BookingDatasource {
	abstract getAllChefBookings(): Promise<Response>;
}

export class BookingDatasourceImpl implements BookingDatasource {
	async getAllChefBookings(): Promise<Response> {
		const response = await apiService.get(`${API_Booking}/chefs`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
}

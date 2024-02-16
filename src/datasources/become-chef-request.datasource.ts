import { CreatedBecomeChefRequestDTO } from "@/types/become-chef-request";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export interface IBecomeChefRequestDatasource {
	createBecomeChefRequest(request: CreatedBecomeChefRequestDTO): Promise<Response>;
	getAllRequests(): Promise<Response>;
	getRequestsByUserId(userId: string): Promise<Response>;
	deleteRequestsById(chefRequestId: string): Promise<Response>;
	updateRequestById(
		requestId: string,
		request: Partial<CreatedBecomeChefRequestDTO>
	): Promise<Response>;
}

export class BecomeChefRequestDatasource implements IBecomeChefRequestDatasource {
	async updateRequestById(
		requestId: string,
		request: Partial<CreatedBecomeChefRequestDTO>
	): Promise<Response> {
		const response = await apiService.put(`/api/requests/${requestId}`, request);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.updateDataErrorMessage);

		const resBody = await response.json();

		return new Response(true, resBody.result, AppString.updateRequestSuccessMessage);
	}
	async deleteRequestsById(chefRequestId: string): Promise<Response> {
		const response = await apiService.delete(`/api/requests/${chefRequestId}`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.deleteDataErrorMessage);

		const resBody = await response.json();

		return new Response(true, resBody.result, AppString.deleteRequestSuccessMessage);
	}
	async getRequestsByUserId(userId: string): Promise<Response> {
		const response = await apiService.get(`/api/requests/user/${userId}`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resBody = await response.json();

		return new Response(true, resBody.result, AppString.getRequestSuccessMeesage);
	}
	async createBecomeChefRequest(request: CreatedBecomeChefRequestDTO): Promise<Response> {
		const response = await apiService.post("/api/requests", request);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.createDataErrorMessage);

		const resBody = await response.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
	async getAllRequests(): Promise<Response> {
		const response = await apiService.get("/api/requests");
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resBody = await response.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
}

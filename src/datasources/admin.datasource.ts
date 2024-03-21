import { LockAccountDTO, VerifyRecipeDTO, VerifyRequestDTO } from "@/types/admin";
import { CreateNotificationDTO } from "@/types/notification";
import { HandleReportDTO } from "@/types/report";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

const API_Admin = "/api/admin";

export abstract class AdminDatasource {
	abstract getDashboardStatistics(): Promise<Response>;
	abstract getAllReports(): Promise<Response>;
	abstract getAllTransactionHistory(): Promise<Response>;
	abstract handleCreateSystemNotification(data: CreateNotificationDTO): Promise<Response>;
	abstract handleReport(data: HandleReportDTO): Promise<Response>;
	abstract getAllRecipes(): Promise<Response>;
	abstract handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Response>;
	abstract getAllAccounts(): Promise<Response>;
	abstract lockAccount(data: LockAccountDTO): Promise<Response>;
	abstract unlockAccount(userId: string): Promise<Response>;
	abstract getAllBecomeChefRequests(): Promise<Response>;
	abstract verifyBecomeChefRequests(data: VerifyRequestDTO): Promise<Response>;
}

export class AdminDatasourceImpl implements AdminDatasource {
	async verifyBecomeChefRequests(data: VerifyRequestDTO): Promise<Response> {
		const response = await apiService.put(`${API_Admin}/requests/verify`, data);
		if (response.status !== 200) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resJson = await response.json();
		return new Response(true, resJson.result, AppString.success);
	}
	async getAllBecomeChefRequests(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/requests`);
		if (response.status !== 200) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resJson = await response.json();
		return new Response(true, resJson.result, AppString.success);
	}
	async lockAccount(data: LockAccountDTO): Promise<Response> {
		const response = await apiService.put(`${API_Admin}/user/lock`, data);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async unlockAccount(userId: string): Promise<Response> {
		const response = await apiService.put(`${API_Admin}/user/unlock/${userId}`, {});
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async getAllAccounts(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/user`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Response> {
		const response = await apiService.put(`${API_Admin}/recipes/verify`, data);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async getAllRecipes(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/recipes`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async handleCreateSystemNotification(data: CreateNotificationDTO): Promise<Response> {
		const response = await apiService.post(`${API_Admin}/notifications`, data);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.createDataErrorMessage);

		const resJson = await response.json();
		return new Response(true, resJson.result, AppString.createNotificationSuccessMessage);
	}
	async handleReport(data: HandleReportDTO): Promise<Response> {
		const response = await apiService.post(`${API_Admin}/reports`, data);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async getAllTransactionHistory(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/transactions`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async getAllReports(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/reports`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async getDashboardStatistics(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/statistics`);
		if (response.status !== 200) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resJson = await response.json();
		return new Response(true, resJson.result, AppString.success);
	}
}

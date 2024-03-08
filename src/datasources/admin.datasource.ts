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
}

export class AdminDatasourceImpl implements AdminDatasource {
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

import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

const API_Admin = "/api/admin";
export abstract class AdminDatasource {
	abstract getDashboardStatistics(): Promise<Response>;
}

export class AdminDatasourceImpl implements AdminDatasource {
	async getDashboardStatistics(): Promise<Response> {
		const response = await apiService.get(`${API_Admin}/statistics`);
		if (response.status !== 200) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resJson = await response.json();
		return new Response(true, resJson.result, AppString.success);
	}
}

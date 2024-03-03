import { SendReportDTO } from "@/types/report";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

const API_Report = "/api/reports";

export abstract class ReportDatasource {
	abstract sendReport(report: SendReportDTO): Promise<Response>;
	abstract getUserReport(): Promise<Response>;
}

export class ReportDatasourceImpl implements ReportDatasource {
	async getUserReport(): Promise<Response> {
		const response = await apiService.get(`${API_Report}`);
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, AppString.getDataErrorMessage);

		const resJson = await response.json();
		const message = resJson.message;

		return new Response(true, resJson.result, message);
	}
	async sendReport(report: SendReportDTO): Promise<Response> {
		const response = await apiService.post(`${API_Report}`, report);
		const isSuccess = response.status === 204;
		if (!isSuccess) return new Response(false, null, AppString.deleteDataErrorMessage);

		return new Response(true, null, AppString.sendReportSuccessMessage);
	}
}

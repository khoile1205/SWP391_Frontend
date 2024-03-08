import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

const API_Notification = "/api/notification";
export abstract class NotificationDatasource {
	abstract seenAllNotification(): Promise<Response>;
}

export class NotificationDatasourceImpl implements NotificationDatasource {
	async seenAllNotification(): Promise<Response> {
		const response = await apiService.get(`${API_Notification}/seenAll`);
		const isSuccess = response.status == 200;
		if (!isSuccess) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resBody = await response.json();
		return new Response(isSuccess, resBody.result, AppString.success);
	}
}

import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class TransactionDatasource {
	abstract getUserTransaction(): Promise<Response>;
}

const API_Transaction = "api/transaction";
export class TransactionDatasourceImpl implements TransactionDatasource {
	async getUserTransaction(): Promise<Response> {
		const response = await apiService.get(`${API_Transaction}`);
		if (response.status !== 200) {
			return new Response(false, [], AppString.noResultFoundMessage);
		}
		const result = await response.json();
		return new Response(true, result.result, AppString.success);
	}
}

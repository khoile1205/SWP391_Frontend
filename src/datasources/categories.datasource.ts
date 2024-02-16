import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

abstract class CategoriesDatasource {
	abstract getAllCategories(): Promise<Response>;
}

class CategoriesDatasourceImpl implements CategoriesDatasource {
	async getAllCategories(): Promise<Response> {
		const response = await apiService.get("/api/categories");
		const isSuccess = response.status === 200;
		if (!isSuccess) return new Response(false, null, "");

		const resBody = await response.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
}

export { CategoriesDatasource, CategoriesDatasourceImpl };

import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

abstract class FileDatasource {
	abstract uploadImage(file: File, path: string): Promise<Response>;
}

class FileDatasourceImpl extends FileDatasource {
	async uploadImage(file: File, path: string): Promise<Response> {
		const res = await apiService.uploadImages("/api/upload/image", [file], path);
		const isSuccess = res.status === 200;
		if (!isSuccess) return new Response(false, null, "Error updating profile. Please try again.");

		const resBody = await res.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
}

export { FileDatasource, FileDatasourceImpl };

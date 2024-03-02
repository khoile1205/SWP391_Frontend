import { CreateCommentDTO } from "@/types/comment";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class CommentDatasource {
	abstract postComment(data: CreateCommentDTO): Promise<Response>;
	abstract getParentCommentByCommentId(id: string): Promise<Response>;
	abstract getCommentById(commentId: string): Promise<Response>;
}

const API_Comment = "/api/comments";
export class CommentDatasourceImpl extends CommentDatasource {
	async getCommentById(commentId: string): Promise<Response> {
		const response = await apiService.get(`${API_Comment}/${commentId}`);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resBody = await response.json();
		return new Response(isSuccess, resBody.result, AppString.success);
	}
	async postComment(data: CreateCommentDTO): Promise<Response> {
		const response = await apiService.post(`${API_Comment}`, data);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(false, null, AppString.createDataErrorMessage);
		}
		const resBody = await response.json();
		return new Response(isSuccess, resBody.result, AppString.commentSuccessMessage);
	}
	async getParentCommentByCommentId(commentId: string): Promise<Response> {
		const response = await apiService.get(`${API_Comment}/parent/${commentId}`);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resBody = await response.json();
		return new Response(isSuccess, resBody.result, AppString.success);
	}
}

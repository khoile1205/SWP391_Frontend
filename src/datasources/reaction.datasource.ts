import { initializeReactionData, PostReactionDTO, Reaction, ReactionType } from "@/types/reaction";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class ReactionDatasource {
	abstract getReactionsByTargetId(type: ReactionType, targetId: string): Promise<Response>;
	abstract postReactionsByTargetId(data: PostReactionDTO): Promise<Response>;
}

const API_Reaction = "/api/reaction";
export class ReactionDatasourceImpl implements ReactionDatasource {
	async postReactionsByTargetId(data: PostReactionDTO): Promise<Response> {
		const response = await apiService.post(`${API_Reaction}`, data);
		const isSuccess = response.status == 200;
		return new Response(
			isSuccess,
			null,
			isSuccess ? AppString.postReactionSuccessMessage : AppString.createDataErrorMessage
		);
	}
	async getReactionsByTargetId(type: ReactionType, targetId: string): Promise<Response> {
		const response = await apiService.get(`${API_Reaction}/${type}?targetId=${targetId}`);
		const isSuccess = response.status == 200;
		if (!isSuccess) {
			return new Response(false, null, AppString.getDataErrorMessage);
		}
		const resBody = await response.json();
		return new Response(
			isSuccess,
			{
				...resBody.result,
				...initializeReactionData,
			} as Reaction,
			AppString.success
		);
	}
}

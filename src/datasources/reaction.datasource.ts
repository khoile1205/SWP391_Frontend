import { Reaction, initializeReactionData } from "@/types/recipe";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class ReactionDatasource {
	abstract getReactionsByTargetId(type: "recipe" | "comment", targetId: string): Promise<Response>;
}

const API_Reaction = "/api/reaction";
export class ReactionDatasourceImpl implements ReactionDatasource {
	async getReactionsByTargetId(type: "recipe" | "comment", targetId: string): Promise<Response> {
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

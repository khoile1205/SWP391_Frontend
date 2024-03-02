import { ReactionDatasource } from "@/datasources/reaction.datasource";
import { PostReactionDTO } from "@/types/reaction";
import Response from "../auth.usecase/responses/response";

export abstract class ReactionUseCase {
	abstract postReaction(data: PostReactionDTO): Promise<Response>;
}

export class ReactionUseCaseImpl implements ReactionUseCase {
	constructor(private readonly reactionDatasource: ReactionDatasource) {}

	async postReaction(data: PostReactionDTO): Promise<Response> {
		return await this.reactionDatasource.postReactionsByTargetId(data);
	}
}

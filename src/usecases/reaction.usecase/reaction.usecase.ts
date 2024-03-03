import { ReactionDatasource } from "@/datasources/reaction.datasource";
import { SendRequestReactionDTO } from "@/types/reaction";
import Response from "../auth.usecase/responses/response";

export abstract class ReactionUseCase {
	abstract postReaction(data: SendRequestReactionDTO): Promise<Response>;
	abstract removeReaction(data: SendRequestReactionDTO): Promise<Response>;
}

export class ReactionUseCaseImpl implements ReactionUseCase {
	constructor(private readonly reactionDatasource: ReactionDatasource) {}
	async removeReaction(data: SendRequestReactionDTO): Promise<Response> {
		return await this.reactionDatasource.removeReaction(data);
	}

	async postReaction(data: SendRequestReactionDTO): Promise<Response> {
		return await this.reactionDatasource.postReactionsByTargetId(data);
	}
}

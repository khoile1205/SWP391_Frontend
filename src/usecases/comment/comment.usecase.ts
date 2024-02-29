import { CommentDatasource } from "@/datasources/comment.datasource";
import Response from "../auth.usecase/responses/response";

export abstract class CommentUsecase {
	abstract getParentCommentByCommentId(id: string): Promise<Response>;
}

export class CommentUsecaseImpl implements CommentUsecase {
	constructor(private readonly commentDatasource: CommentDatasource) {}

	async getParentCommentByCommentId(id: string): Promise<Response> {
		return await this.commentDatasource.getParentCommentByCommentId(id);
	}
}

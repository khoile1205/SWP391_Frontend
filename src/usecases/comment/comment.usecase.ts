import { CommentDatasource } from "@/datasources/comment.datasource";
import Response from "../auth.usecase/responses/response";
import { CreateCommentDTO } from "@/types/comment";

export abstract class CommentUsecase {
	abstract getParentCommentByCommentId(id: string): Promise<Response>;
	abstract postComment(data: CreateCommentDTO): Promise<Response>;
}

export class CommentUsecaseImpl implements CommentUsecase {
	constructor(private readonly commentDatasource: CommentDatasource) {}
	async postComment(data: CreateCommentDTO): Promise<Response> {
		return await this.commentDatasource.postComment(data);
	}

	async getParentCommentByCommentId(id: string): Promise<Response> {
		return await this.commentDatasource.getParentCommentByCommentId(id);
	}
}

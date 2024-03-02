import { CommentDatasource } from "@/datasources/comment.datasource";
import Response from "../auth.usecase/responses/response";
import { CreateCommentDTO, initializeCommentData } from "@/types/comment";
import { CommentEntity } from "@/models/comment.model";
import { ReactionDatasource } from "@/datasources/reaction.datasource";
import { UserDatasource } from "@/datasources/user.datasource";
import { User } from "@/models/user.model";
import { Reaction, initializeReactionData } from "@/types/reaction";

export abstract class CommentUsecase {
	abstract getParentCommentByCommentId(id: string): Promise<Response>;
	abstract postComment(data: CreateCommentDTO): Promise<Response>;
	abstract getCommentById(commentId: string): Promise<Response>;
}

export class CommentUsecaseImpl implements CommentUsecase {
	constructor(
		private readonly commentDatasource: CommentDatasource,
		private readonly reactionDatasource: ReactionDatasource,
		private readonly userDatasource: UserDatasource
	) {}
	async getCommentById(commentId: string): Promise<Response> {
		const response = await this.commentDatasource.getCommentById(commentId);
		if (!response.isSuccess) {
			return response;
		}

		const comment: CommentEntity = initializeCommentData({
			commentData: response.data as CommentEntity,
		});

		const listChildComments = (await this.getParentCommentByCommentId(comment.commentId)).data;

		comment.listChildComments = listChildComments as CommentEntity[];

		const stack: CommentEntity[] = [comment as CommentEntity];

		while (stack.length > 0) {
			const currentComment = stack.pop() as CommentEntity;
			const listChildComments: CommentEntity[] = [];

			await Promise.all(
				currentComment.listChildComments.map(async (comment) => {
					if (comment.parentCommentId == currentComment.commentId) {
						const reaction = (
							await this.reactionDatasource.getReactionsByTargetId("comment", comment.commentId)
						).data;
						const userData = await this.userDatasource.getUserById(comment.userId as string);

						const commentWithChildren: CommentEntity = {
							...comment,
							userId: userData.data as User,
							listChildComments: [],
							reaction: { ...initializeReactionData, ...(reaction as Reaction) },
						};
						listChildComments.push(commentWithChildren);
						stack.push(commentWithChildren);
					}
				})
			);

			currentComment.listChildComments = listChildComments;
		}

		return { ...response, data: comment };
	}
	async postComment(data: CreateCommentDTO): Promise<Response> {
		return await this.commentDatasource.postComment(data);
	}

	async getParentCommentByCommentId(id: string): Promise<Response> {
		return await this.commentDatasource.getParentCommentByCommentId(id);
	}
}

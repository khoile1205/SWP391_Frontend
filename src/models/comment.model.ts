import { CommentType } from "@/enums/comment.type.enum";
import { User } from "./user.model";
import { Reaction } from "@/types/reaction";

export class CommentEntity {
	commentId: string;
	content: string;
	parentCommentId: string | null | CommentEntity;
	recipeId: string;
	type: CommentType;
	userId: string | User;
	listChildComments: CommentEntity[] | any[];
	reaction: Reaction;
	createdAt: Date;
	updatedAt: Date;
	constructor(
		commentId: string,
		content: string,
		parentCommentId: string | null | CommentEntity,
		recipeId: string,
		type: CommentType,
		listChildComments: CommentEntity[] | any[],
		userId: string | User,
		reaction: Reaction,
		createdAt: Date,
		updatedAt: Date
	) {
		this.commentId = commentId;
		this.content = content;
		this.parentCommentId = parentCommentId;
		this.recipeId = recipeId;
		this.type = type;
		this.listChildComments = listChildComments;
		this.userId = userId;
		this.reaction = reaction;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

export class Comment {
	total: number;
	data: CommentEntity[];
	constructor(total: number, data: CommentEntity[]) {
		this.total = total;
		this.data = data;
	}
}

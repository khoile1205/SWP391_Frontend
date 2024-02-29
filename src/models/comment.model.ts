import { CommentType } from "@/enums/comment.type.enum";
import { User } from "./user.model";

export class Comment {
	commentId: string;
	content: string;
	parentCommentId: string | null | Comment;
	recipeId: string;
	type: CommentType;
	userId: string | User;
	createdAt: Date;
	updatedAt: Date;
	constructor(
		commentId: string,
		content: string,
		parentCommentId: string | null | Comment,
		recipeId: string,
		type: CommentType,
		userId: string | User,
		createdAt: Date,
		updatedAt: Date
	) {
		this.commentId = commentId;
		this.content = content;
		this.parentCommentId = parentCommentId;
		this.recipeId = recipeId;
		this.type = type;
		this.userId = userId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

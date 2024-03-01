import { CommentType } from "@/enums/comment.type.enum";
import { User } from "./user.model";
import { Reaction } from "@/types/recipe";

export class Comment {
	commentId: string;
	content: string;
	parentCommentId: string | null | Comment;
	recipeId: string;
	type: CommentType;
	userId: string | User;
	listChildComments: Comment[] | any[];
	reaction: Reaction;
	createdAt: Date;
	updatedAt: Date;
	constructor(
		commentId: string,
		content: string,
		parentCommentId: string | null | Comment,
		recipeId: string,
		type: CommentType,
		listChildComments: Comment[] | any[],
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

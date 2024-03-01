import { CommentType } from "@/enums/comment.type.enum";

export type CreateCommentDTO = {
	parentCommentId: string | null;
	content: string;
	recipeId: string;
	type: CommentType;
};

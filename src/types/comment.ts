import { CommentType } from "@/enums/comment.type.enum";
import { CommentEntity } from "@/models/comment.model";
import { initializeReactionData } from "./reaction";
import { User } from "@/models/user.model";

export type CreateCommentDTO = {
	parentCommentId: string | null;
	content: string;
	recipeId: string;
	type: CommentType;
};

export const initializeCommentData = ({
	commentData,
	user,
}: {
	commentData: CommentEntity;
	user?: User;
}): CommentEntity => ({
	...commentData,
	listChildComments: [],
	userId: user ?? commentData.userId,
	reactions: initializeReactionData,
});

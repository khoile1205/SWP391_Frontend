import { create } from "zustand";
import Result from "./commons/result";
import { commentUseCase } from "@/usecases";
import { Comment } from "@/models/comment.model";

type Action = {
	getParentCommentByCommentId: (commentId: string) => Promise<Result>;
};

export const commentStore = create<Action>(() => ({
	getParentCommentByCommentId: async (commentId: string) => {
		const response = await commentUseCase.getParentCommentByCommentId(commentId);
		if (response.isSuccess) {
			return Result.success(response.message, response.data as Comment[] | []);
		}
		return Result.failed(response.message);
	},
}));

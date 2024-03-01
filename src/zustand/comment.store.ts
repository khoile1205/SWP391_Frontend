import { create } from "zustand";
import Result from "./commons/result";
import { commentUseCase } from "@/usecases";
import { Comment } from "@/models/comment.model";
import { CreateCommentDTO } from "@/types/comment";

type Action = {
	postComment: (data: CreateCommentDTO) => Promise<Result>;
	getParentCommentByCommentId: (commentId: string) => Promise<Result>;
};

export const commentStore = create<Action>(() => ({
	postComment: async (data: CreateCommentDTO) => {
		const response = await commentUseCase.postComment(data);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		}
		return Result.failed(response.message);
	},
	getParentCommentByCommentId: async (commentId: string) => {
		const response = await commentUseCase.getParentCommentByCommentId(commentId);
		if (response.isSuccess) {
			return Result.success(response.message, response.data as Comment[] | []);
		}
		return Result.failed(response.message);
	},
}));

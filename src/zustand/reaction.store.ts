import { reactionUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";
import { PostReactionDTO } from "@/types/reaction";

type Action = {
	postReaction: (data: PostReactionDTO) => Promise<Result>;
};

export const reactionStore = create<Action>(() => ({
	postReaction: async (data: PostReactionDTO) => {
		const response = await reactionUseCase.postReaction(data);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		}
		return Result.failed(response.message);
	},
}));

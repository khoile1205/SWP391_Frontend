import { reactionUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";
import { SendRequestReactionDTO } from "@/types/reaction";

type Action = {
	postReaction: (data: SendRequestReactionDTO) => Promise<Result>;
	removeReaction: (data: SendRequestReactionDTO) => Promise<Result>;
};

export const reactionStore = create<Action>(() => ({
	postReaction: async (data: SendRequestReactionDTO) => {
		const response = await reactionUseCase.postReaction(data);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		}
		return Result.failed(response.message);
	},
	removeReaction: async (data: SendRequestReactionDTO) => {
		const response = await reactionUseCase.removeReaction(data);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		}
		return Result.failed(response.message);
	},
}));

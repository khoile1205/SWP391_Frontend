import { create } from "zustand";
import Result from "./commons/result";
import { SearchData, SearchQuery } from "@/types/search";
import { searchUseCase } from "@/usecases";

type Action = {
	search: (query: SearchQuery) => Promise<Result>;
};

export const searchStore = create<Action>(() => ({
	search: async (query: SearchQuery): Promise<Result> => {
		const response = await searchUseCase.search(query);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data as SearchData);
	},
}));

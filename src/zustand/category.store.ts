import { categoriesUsecase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";
import { Category } from "@/types/recipe";

type State = {
	categories: Category[];
};

type Action = {
	getAllCategories: () => Promise<Result>;
};

export const categoriesStore = create<State & Action>((set) => ({
	categories: [],
	getAllCategories: async () => {
		const response = await categoriesUsecase.getAllCategories();
		if (response.isSuccess) {
			set(() => ({ categories: response.data as Category[] }));
			return Result.success(response.message, response.data);
		}
		return Result.failed(response.message);
	},
}));

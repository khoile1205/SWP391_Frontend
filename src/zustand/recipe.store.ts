import { CreateRecipeDTO } from "@/types/recipe";
import { recipeUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";

type Action = {
	createRecipe: (data: CreateRecipeDTO) => Promise<Result>;
	getRecipeById: (recipeId: string) => Promise<Result>;
	saveFavoriteRecipe: (recipeId: string) => Promise<Result>;
	removeFavoriteRecipe: (recipeId: string) => Promise<Result>;
	getUserFavoriteRecipe: (userId: string) => Promise<Result>;
	getRecipesWithPagination: (page: number) => Promise<Result>;
	getAllRecipes: () => Promise<Result>;
	getRecipesByCategoryId: (categoryId: string) => Promise<Result>;
};

export const recipeStore = create<Action>(() => ({
	createRecipe: async (data: CreateRecipeDTO): Promise<Result> => {
		const response = await recipeUseCase.createRecipe(data);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},

	getRecipeById: async (recipeId): Promise<Result> => {
		const response = await recipeUseCase.getRecipeById(recipeId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	saveFavoriteRecipe: async (recipeId): Promise<Result> => {
		const response = await recipeUseCase.saveFavoriteRecipe(recipeId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	removeFavoriteRecipe: async (recipeId): Promise<Result> => {
		const response = await recipeUseCase.removeFavoriteRecipe(recipeId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	getUserFavoriteRecipe: async (recipeId): Promise<Result> => {
		const response = await recipeUseCase.getUserFavoriteRecipes(recipeId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	getAllRecipes: async (): Promise<Result> => {
		const response = await recipeUseCase.getAllRecipes();
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	getRecipesWithPagination: async (page: number): Promise<Result> => {
		const response = await recipeUseCase.getRecipesWithPagination(page);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	getRecipesByCategoryId: async (categoryId: string): Promise<Result> => {
		const response = await recipeUseCase.getRecipesByCategoryId(categoryId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
}));

import { CreateRecipeDTO, UpdateRecipeDTO } from "@/types/recipe";
import { recipeUseCase, userUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";
import { Recipe } from "@/models/recipe.model";

type Action = {
	createRecipe: (data: CreateRecipeDTO) => Promise<Result>;
	getRecipeById: (recipeId: string) => Promise<Result>;
	saveFavoriteRecipe: (recipeId: string) => Promise<Result>;
	removeFavoriteRecipe: (recipeId: string) => Promise<Result>;
	getUserFavoriteRecipe: (userId: string) => Promise<Result>;
	getRecipesWithPagination: (page: number) => Promise<Result>;
	getAllRecipes: () => Promise<Result>;
	getRecipesByCategoryId: (categoryId: number) => Promise<Result>;
	getRecipesByUserId: (userId: string) => Promise<Result>;
	updateRecipeById: (recipeId: string, newRecipe: UpdateRecipeDTO) => Promise<Result>;
	deleteRecipeById: (recipeId: string) => Promise<Result>;
};

export const recipeStore = create<Action>(() => ({
	deleteRecipeById: async (recipeId): Promise<Result> => {
		const response = await recipeUseCase.deleteRecipeById(recipeId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	createRecipe: async (data: CreateRecipeDTO): Promise<Result> => {
		const response = await recipeUseCase.createRecipe(data);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	updateRecipeById: async (recipeId, newRecipe): Promise<Result> => {
		const response = await recipeUseCase.updateRecipeById(recipeId, newRecipe);
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
		const recipeData = response.data as Recipe;

		recipeData.comments = await Promise.all(
			recipeData.comments.map(async (comment: any) => {
				const userId = comment.userId;
				const userData = await userUseCase.getUserById(userId as string);
				return { ...comment, userId: userData.data };
			})
		);

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
	getRecipesByCategoryId: async (categoryId: number): Promise<Result> => {
		const response = await recipeUseCase.getRecipesByCategoryId(categoryId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	getRecipesByUserId: async (userId: string): Promise<Result> => {
		const response = await recipeUseCase.getRecipesByUserId(userId);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
}));

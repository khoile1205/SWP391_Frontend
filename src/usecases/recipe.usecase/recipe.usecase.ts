import { IRecipeDatasource } from "@/datasources/recipe.datasource";
import { CreateRecipeDTO, UpdateRecipeDTO } from "@/types/recipe";
import Response from "../auth.usecase/responses/response";

export abstract class IRecipeUseCase {
	abstract createRecipe(data: CreateRecipeDTO): Promise<Response>;
	abstract getRecipeById(id: string): Promise<Response>;
	abstract getAllRecipes(): Promise<Response>;
	abstract getRecipesWithPagination(page: number): Promise<Response>;
	abstract updateRecipeById(id: string, recipe: Partial<CreateRecipeDTO>): Promise<Response>;
	abstract saveFavoriteRecipe(recipeId: string): Promise<Response>;
	abstract removeFavoriteRecipe(recipeId: string): Promise<Response>;
	abstract getUserFavoriteRecipes(userId: string): Promise<Response>;
	abstract getRecipesByCategoryId(categoryId: number): Promise<Response>;
	abstract getRecipesByUserId(userId: string): Promise<Response>;
	abstract deleteRecipeById(recipeId: string): Promise<Response>;
}

export class RecipeUseCase implements IRecipeUseCase {
	constructor(private readonly recipeDatasource: IRecipeDatasource) {}
	async deleteRecipeById(recipeId: string): Promise<Response> {
		return await this.recipeDatasource.deleteRecipeById(recipeId);
	}
	async getRecipesByUserId(userId: string): Promise<Response> {
		return await this.recipeDatasource.getRecipesByUserId(userId);
	}
	async getRecipesByCategoryId(categoryId: number): Promise<Response> {
		return await this.recipeDatasource.getRecipesByCategoryId(categoryId);
	}
	async getRecipesWithPagination(page: number): Promise<Response> {
		return await this.recipeDatasource.getRecipeWithPagination(page);
	}
	async getUserFavoriteRecipes(userId: string): Promise<Response> {
		return await this.recipeDatasource.getUserFavoriteRecipe(userId);
	}
	async removeFavoriteRecipe(recipeId: string): Promise<Response> {
		return await this.recipeDatasource.removeFavoriteRecipe(recipeId);
	}
	async saveFavoriteRecipe(recipeId: string): Promise<Response> {
		return await this.recipeDatasource.saveFavoriteRecipe(recipeId);
	}
	async createRecipe(data: CreateRecipeDTO): Promise<Response> {
		return await this.recipeDatasource.createRecipe(data);
	}
	async getRecipeById(id: string): Promise<Response> {
		return await this.recipeDatasource.getRecipeById(id);
	}
	async getAllRecipes(): Promise<Response> {
		return await this.recipeDatasource.getAllRecipes();
	}
	async updateRecipeById(id: string, recipe: UpdateRecipeDTO): Promise<Response> {
		return await this.recipeDatasource.updateRecipeById(id, recipe);
	}
}

import { CreateRecipeDTO, UpdateRecipeDTO } from "@/types/recipe";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class IRecipeDatasource {
	abstract createRecipe(data: CreateRecipeDTO): Promise<Response>;
	abstract getRecipeById(id: string): Promise<Response>;
	abstract getAllRecipes(): Promise<Response>;
	abstract getRecipeWithPagination(page: number): Promise<Response>;
	abstract updateRecipeById(id: string, recipe: UpdateRecipeDTO): Promise<Response>;
	abstract getRecipeByUserId(userId: string): Promise<Response>;
	abstract saveFavoriteRecipe(recipeId: string): Promise<Response>;
	abstract removeFavoriteRecipe(recipeId: string): Promise<Response>;
	abstract getUserFavoriteRecipe(userId: string): Promise<Response>;
	abstract getRecipesByCategoryId(categoryId: string): Promise<Response>;
}

export class RecipeDatasource implements IRecipeDatasource {
	async getRecipesByCategoryId(categoryId: string): Promise<Response> {
		const response = await apiService.get(`/api/recipes/categories/${categoryId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getAllRecipes(): Promise<Response> {
		const response = await apiService.get("/api/recipes");
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getRecipeWithPagination(page: number): Promise<Response> {
		const response = await apiService.get(`/api/recipes/page/${page}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getUserFavoriteRecipe(userId: string): Promise<Response> {
		const response = await apiService.get(`/api/recipes/favorites/user/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async removeFavoriteRecipe(recipeId: string): Promise<Response> {
		const response = await apiService.delete(`/api/recipes/favorites/remove/${recipeId}`, {});
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		console.log(isSuccess);
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async saveFavoriteRecipe(recipeId: string): Promise<Response> {
		const response = await apiService.post(`/api/recipes/favorites/save/${recipeId}`, {});
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async getRecipeById(id: string): Promise<Response> {
		const response = await apiService.get(`/api/recipes/${id}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, AppString.getRecipeSuccessMessage);
	}
	async getRecipeByUserId(userId: string): Promise<Response> {
		const response = await apiService.get(`/api/recipes/user/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, message);
	}
	async updateRecipeById(id: string, recipe: Partial<CreateRecipeDTO>): Promise<Response> {
		const response = await apiService.put(`/api/recipes/${id}`, recipe);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, AppString.updateRecipeSuccessMessage);
	}
	async createRecipe(data: CreateRecipeDTO): Promise<Response> {
		const response = await apiService.post("/api/recipes", data);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		console.log(resBody);
		const message = resBody.message;
		if (!isSuccess) return new Response(false, null, message);

		return new Response(true, resBody.result, AppString.createRecipeSuccessMessage);
	}
}

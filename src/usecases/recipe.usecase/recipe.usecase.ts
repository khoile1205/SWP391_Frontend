import { IRecipeDatasource } from "@/datasources/recipe.datasource";
import { CreateRecipeDTO, Reaction, UpdateRecipeDTO } from "@/types/recipe";
import Response from "../auth.usecase/responses/response";
import { Comment } from "@/models/comment.model";
import { Recipe } from "@/models/recipe.model";
import { ReactionDatasource } from "@/datasources/reaction.datasource";
import { UserDatasource } from "@/datasources/user.datasource";
import { User } from "@/models/user.model";

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
	constructor(
		private readonly recipeDatasource: IRecipeDatasource,
		private readonly reactionDatasource: ReactionDatasource,
		private readonly userDatasource: UserDatasource
	) {}
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
		const response = await this.recipeDatasource.getRecipeById(id);
		if (!response.isSuccess) {
			return response;
		}

		const recipe = response.data!;
		const rootComments: Comment[] = [];

		await Promise.all(
			(recipe as Recipe).comments.map(async (comment) => {
				if (comment.parentCommentId == null) {
					const reaction = (
						await this.reactionDatasource.getReactionsByTargetId("comment", comment.commentId)
					).data;
					const userData = (await this.userDatasource.getUserById(comment.userId as string)).data;
					const newRootComments: Comment = {
						...comment,
						userId: userData as User,
						listChildComments: [],
						reaction: reaction as Reaction,
					};
					rootComments.push(newRootComments);
				}
			})
		);

		const stack: Comment[] = [...rootComments];

		while (stack.length > 0) {
			const currentComment = stack.pop() as Comment;
			const listChildComments: Comment[] = [];

			await Promise.all(
				(recipe as Recipe).comments.map(async (comment) => {
					if (comment.parentCommentId == currentComment.commentId) {
						const reaction = (
							await this.reactionDatasource.getReactionsByTargetId("comment", comment.commentId)
						).data;
						const userData = await this.userDatasource.getUserById(comment.userId as string);

						const commentWithChildren: Comment = {
							...comment,
							userId: userData.data as User,
							listChildComments: [],
							reaction: reaction as Reaction,
						};
						listChildComments.push(commentWithChildren);
						stack.push(commentWithChildren);
					}
				})
			);
			currentComment.listChildComments = listChildComments;
		}

		return {
			...response,
			data: {
				...response.data,
				comments: rootComments,
			},
		};
	}
	async getAllRecipes(): Promise<Response> {
		return await this.recipeDatasource.getAllRecipes();
	}
	async updateRecipeById(id: string, recipe: UpdateRecipeDTO): Promise<Response> {
		return await this.recipeDatasource.updateRecipeById(id, recipe);
	}
}

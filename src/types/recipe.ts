export type Instructors = {
	description: string;
	imageUrls: string[];
	instructorOrder: number;
};

export type Ingredients = {
	name: string;
	amount: string;
	ingredientTipId?: string;
};
export interface CreateRecipeDTO {
	title: string;
	description: string;
	thumbnailUrl?: string;
	isPrivate: boolean;
	price: number;
	ratings: number;
	cookingTime: number;
	portion: number;
	categories: number[];
	ingredients: Ingredients[];
	instructors: Instructors[];
}

export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;

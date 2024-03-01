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

export interface Category {
	id: number;
	imageUrl: string;
	name: string;
}

export interface CreateRecipeDTO {
	title: string;
	description: string;
	thumbnailUrl?: string;
	isPrivate: boolean;
	price: number;
	difficult: number;
	cookingTime: number;
	portion: number;
	categories: number[];
	ingredients: Ingredients[];
	instructors: Instructors[];
}

export type Reaction = {
	haha: number;
	like: number;
	favorite: number;
};

export const initializeReactionData = {
	haha: 0,
	like: 0,
	favorite: 0,
};

export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;

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

export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;

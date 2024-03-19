import { Recipe } from "@/models/recipe.model";
import { ShortInfoUser } from "./user";

export type CreateBookingDTO = {
	chefId: string;
	address: string;
	timeStart: Date;
	timeEnd: Date;
	bookingDishes: {
		recipeId: string | Recipe;
		quantity: number;
		note: string;
	}[];
	total: number;
};

export type ChefBookingEntity = ShortInfoUser & {
	address: string;
	isMale: boolean;
	followerCount: number;
	listRecipes: Recipe[];
};

export type ChefBookingSchedule = {
	timeStart: Date;
	timeEnd: Date;
};

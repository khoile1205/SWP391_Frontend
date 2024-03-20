import { Recipe } from "@/models/recipe.model";
import { ShortInfoUser } from "./user";
import { ActionStatus } from "@/enums";

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

export type UpdateBookingDTO = {
	bookingId: string;
	status: ActionStatus;
};

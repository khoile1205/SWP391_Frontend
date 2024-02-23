import { Ingredients, Instructors } from "@/types/recipe";
import { ShortInfoUser } from "@/types/user";

export class Recipe {
	id: string;
	user: ShortInfoUser;
	title: string;
	description: string;
	thumbnailUrl: string;
	isPrivate: boolean;
	portion: number;
	cookingTime: number;
	price: number;
	ratings: number;
	instructors: Instructors[];
	ingredients: Ingredients[];
	categories: number[];
	createdAt: Date;
	updatedAt: Date;

	constructor(
		id: string,
		user: ShortInfoUser,
		title: string,
		description: string,
		thumbnailUrl: string,
		isPrivate: boolean,
		portion: number,
		cookingTime: number,
		price: number,
		ratings: number,
		instructors: Instructors[],
		ingredients: Ingredients[],
		categories: number[],
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.user = user;
		this.title = title;
		this.description = description;
		this.thumbnailUrl = thumbnailUrl;
		this.isPrivate = isPrivate;
		this.portion = portion;
		this.cookingTime = cookingTime;
		this.price = price;
		this.ratings = ratings;
		this.instructors = instructors;
		this.ingredients = ingredients;
		this.categories = categories;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

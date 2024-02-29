import { Category, Ingredients, Instructors, Reaction } from "@/types/recipe";
import { ShortInfoUser } from "@/types/user";
import { Comment } from "./comment.model";

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
	difficult: number;
	instructors: Instructors[];
	ingredients: Ingredients[];
	categories: Category[];
	createdAt: Date;
	updatedAt: Date;
	comments: Comment[];
	reaction: Reaction;
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
		difficult: number,
		instructors: Instructors[],
		ingredients: Ingredients[],
		categories: Category[],
		createdAt: Date,
		updatedAt: Date,
		comments: Comment[],
		reaction: Reaction
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
		this.difficult = difficult;
		this.instructors = instructors;
		this.ingredients = ingredients;
		this.categories = categories;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.comments = comments;
		this.reaction = reaction;
	}
}

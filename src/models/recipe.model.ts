import { ShortInfoUser } from "@/types/user";
import { Comment } from "./comment.model";
import { Category, Ingredients, Instructors } from "@/types/recipe";
import { Reaction } from "@/types/reaction";

export class Recipe {
	id: string;
	user: ShortInfoUser;
	title: string;
	description: string;
	thumbnailUrl: string;
	isPrivate: boolean;
	portion: number;
	cookingTime: number;
	recipePrice: number;
	isAvailableForBooking: boolean;
	bookingPrice: number;
	isPublic: boolean;
	difficult: number;
	instructors: Instructors[];
	ingredients: Ingredients[];
	categories: Category[];
	createdAt: Date;
	isVerified: boolean;
	updatedAt: Date;
	comments: Comment;
	reactions: Reaction;
	constructor(
		id: string,
		user: ShortInfoUser,
		title: string,
		description: string,
		thumbnailUrl: string,
		isPrivate: boolean,
		recipePrice: number,
		isPublic: boolean,

		portion: number,
		isAvailableForBooking: boolean,
		bookingPrice: number,
		cookingTime: number,
		difficult: number,
		isVerified: boolean,
		instructors: Instructors[],
		ingredients: Ingredients[],
		categories: Category[],
		createdAt: Date,
		updatedAt: Date,
		comments: Comment,
		reactions: Reaction
	) {
		this.id = id;
		this.user = user;
		this.title = title;
		this.isPublic = isPublic;
		this.description = description;
		this.thumbnailUrl = thumbnailUrl;
		this.isPrivate = isPrivate;
		this.portion = portion;
		this.cookingTime = cookingTime;
		this.recipePrice = recipePrice;
		this.isAvailableForBooking = isAvailableForBooking;
		this.bookingPrice = bookingPrice;
		this.difficult = difficult;
		this.instructors = instructors;
		this.ingredients = ingredients;
		this.categories = categories;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.comments = comments;
		this.isVerified = isVerified;
		this.reactions = reactions;
	}
}

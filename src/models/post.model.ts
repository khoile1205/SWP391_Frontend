import { User } from "./user.model";

export class Post {
	id: string;
	userId: string | User;
	title: string;
	description: string;
	thumbnail: string;
	isPrivate: boolean;
	price: number;
	rating: number;
	recipeId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		id: string,
		userId: string,
		title: string,
		description: string,
		thumbnail: string,
		isPrivate: boolean,
		price: number,
		rating: number,
		recipeId: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.isPrivate = isPrivate;
		this.price = price;
		this.rating = rating;
		this.recipeId = recipeId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

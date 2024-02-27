import { Recipe } from "@/models/recipe.model";
import { User } from "@/models/user.model";

export type SearchQuery = {
	type: "all" | "recipes" | "users";
	keyword: string;
};

export interface SearchData {
	users: User[];
	recipes: Recipe[];
}

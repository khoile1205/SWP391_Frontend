import { Reactions } from "@/enums/reaction.enum";

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

export type ReactionType = "recipe" | "comment";

export type PostReactionDTO = {
	reaction: Reactions;
	targetID: string;
	type: ReactionType;
};

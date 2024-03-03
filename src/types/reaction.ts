import { Reactions } from "@/enums/reaction.enum";

export type Reaction = {
	haha: string[];
	like: string[];
	favorite: string[];
};

export const initializeReactionData = {
	haha: [],
	like: [],
	favorite: [],
};

export type ReactionType = "recipe" | "comment";

export type SendRequestReactionDTO = {
	reaction: Reactions;
	targetID: string;
	type: ReactionType;
};

import userStore from "@/zustand/user.store";
import { useEffectOnce } from "usehooks-ts";

export const useInitializeUserReaction = () => {
	const { getUserReactionByType, userRecipeReaction } = userStore((state) => state);
	useEffectOnce(() => {
		if (userRecipeReaction == null) {
			getUserReactionByType("recipe");
		}
	});
};

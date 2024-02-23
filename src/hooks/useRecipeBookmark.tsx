import { recipeStore } from "@/zustand/recipe.store";
import userStore from "@/zustand/user.store";
import { useEffect, useState } from "react";

export const useRecipeBookmark = (recipeId: string | undefined) => {
	const [bookmarked, setBookmarked] = useState(false);
	const { user } = userStore((state) => state);
	const { getUserFavoriteRecipe } = recipeStore((state) => state);
	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const response = await getUserFavoriteRecipe(user.id);
				if (response.isSuccess) {
					const isBookmarked = response.data.some((item: any) => item.id === recipeId);
					setBookmarked(isBookmarked);
				}
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { bookmarked, setBookmarked };
};

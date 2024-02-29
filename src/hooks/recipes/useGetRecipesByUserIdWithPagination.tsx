import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetRecipesByUserIdWithPagination = (userId: string | undefined) => {
	const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);

	const { getRecipesByUserId } = recipeStore((state) => state);

	const fetchData = async () => {
		if (userId == undefined) return;
		const response = await getRecipesByUserId(userId);
		if (response.isSuccess) {
			setVisibleRecipes(response.data);
		}
	};

	useEffectOnce(() => {
		fetchData();
	});

	return { visibleRecipes, setVisibleRecipes };
};

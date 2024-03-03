import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { merge } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const useGetRelatedRecipes = (recipe: Recipe | null) => {
	const [relatedRecipes, setRecipes] = useState<Recipe[]>([]);
	const { getRecipesByCategoryId, getRecipesByUserId } = recipeStore((state) => state);

	const fetchData = useCallback(async () => {
		if (!recipe) return;

		await Promise.all(
			recipe.categories.map(async (category) => {
				const response = await getRecipesByCategoryId(+category.id);
				if (response.isSuccess) {
					setRecipes((prev) => merge(prev, response.data));
				}
			})
		);
		const response = await getRecipesByUserId(recipe.user.id);
		if (response.isSuccess) {
			setRecipes((prev) => merge(prev, response.data));
		}

		setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
	}, [recipe, getRecipesByCategoryId, getRecipesByUserId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]); // Add recipe to the dependency array

	return { relatedRecipes };
};

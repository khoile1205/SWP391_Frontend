import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useEffect, useState } from "react";

export const useGetRecipeById = (recipeId: string | undefined) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
	const { getRecipeById } = recipeStore((state) => state);
	useEffect(() => {
		const fetchData = async () => {
			const response = await getRecipeById(recipeId!);
			if (!response.isSuccess) {
				return;
			}

			setRecipe(response.data);
			setCheckedIngredients(Array(response.data.ingredients.length).fill(false));
		};

		if (recipeId != undefined) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { recipe, checkedIngredients, setCheckedIngredients };
};

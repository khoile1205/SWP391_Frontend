import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetRecipeById = (recipeId: string | undefined) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
	const { getRecipeById } = recipeStore((state) => state);
	const fetchData = async () => {
		if (recipeId == undefined) return;

		const response = await getRecipeById(recipeId);
		if (!response.isSuccess) {
			return;
		}

		setRecipe(response.data);
		setCheckedIngredients(Array(response.data.ingredients.length).fill(false));
	};

	useEffectOnce(() => {
		if (recipeId != undefined) {
			fetchData();
		}
	});

	return { recipe, checkedIngredients, setCheckedIngredients };
};

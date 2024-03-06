import { Recipe } from "@/models/recipe.model";
import { useLoadingStore } from "@/zustand/loading.store";
import { recipeStore } from "@/zustand/recipe.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetRecipeById = (recipeId: string | undefined) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
	const { getRecipeById } = recipeStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const fetchData = async () => {
		setLoading(true);
		if (recipeId == undefined) {
			setLoading(false);
			return;
		}

		const response = await getRecipeById(recipeId);
		if (!response.isSuccess) {
			setLoading(false);
			return;
		}
		setRecipe(response.data);
		setCheckedIngredients(
			recipe?.ingredients ? Array(response.data.ingredients.length).fill(false) : []
		);
		setLoading(false);
	};

	useEffectOnce(() => {
		if (recipeId != undefined) {
			fetchData();
		}
	});

	return { recipe, checkedIngredients, setCheckedIngredients };
};

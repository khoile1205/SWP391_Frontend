import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
export const useGetAllRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const { getAllRecipes } = recipeStore((state) => state);

	const fetchData = async () => {
		const response = await getAllRecipes();
		if (response.isSuccess) {
			setRecipes(response.data);
		}
	};
	useEffectOnce(() => {
		fetchData();
	});

	return { recipes };
};

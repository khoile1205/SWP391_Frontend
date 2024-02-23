import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useEffect, useState } from "react";

export const useGetAllRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const { getAllRecipes } = recipeStore((state) => state);
	useEffect(() => {
		const fetchData = async () => {
			const response = await getAllRecipes();
			if (response.isSuccess) {
				setRecipes(response.data);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { recipes };
};

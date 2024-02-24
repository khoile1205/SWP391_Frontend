import { Category } from "@/models/category.model";
import { Recipe } from "@/models/recipe.model";
import { categoriesStore } from "@/zustand/category.store";
import { useLoadingStore } from "@/zustand/loading.store";
import { recipeStore } from "@/zustand/recipe.store";
import { useEffect, useState } from "react";

export const useGetRecipeByCategoryId = (categoryId: string) => {
	const [category, setCategory] = useState<Category>();
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const { getRecipesByCategoryId } = recipeStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const { getAllCategories } = categoriesStore((state) => state);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await getRecipesByCategoryId(categoryId);
			if (response.isSuccess) {
				setRecipes(response.data);
			}

			const data = await getAllCategories();
			if (data.isSuccess) {
				const existedCategory = (data.data as Category[]).find((c: Category) => c.id == categoryId);
				if (existedCategory) {
					setCategory(existedCategory);
				}
			}
			const timeOutId = setTimeout(() => {
				setLoading(false);
			}, 500);
			return () => clearTimeout(timeOutId);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { recipes, category };
};

import { Recipe } from "@/models/recipe.model";
import { Category } from "@/types/recipe";
import { categoriesStore } from "@/zustand/category.store";
import { recipeStore } from "@/zustand/recipe.store";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRecipesWtihCategory = () => {
	const { getRecipesByCategoryId } = recipeStore((state) => state);
	const { categories } = categoriesStore((state) => state);

	const { data } = useQuery({
		queryKey: ["recipesByCategory"],
		queryFn: async () => {
			const data: {
				category: Category;
				recipes: Recipe[];
			}[] = [];

			await Promise.all(
				categories.map(async (category) => {
					const response = await getRecipesByCategoryId(category.id);
					if (response.isSuccess && response.data.length > 0) {
						data.push({
							category: category,
							recipes: response.data,
						});
					}
				})
			);

			return data;
		},
		retry: false,
		retryDelay: 0,
	});

	return { data };
};

import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useEffect, useState } from "react";

export const useGetRecipesByUserId = (userId: string | undefined, filter: "newest" | "oldest") => {
	const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
	const [page, setPage] = useState(1); // Track the current page
	const [hasMore, setHasMore] = useState(true); // Track if there are more recipes to load

	const { getRecipesByUserId } = recipeStore((state) => state);

	const fetchData = async () => {
		if (userId == undefined) return;
		const response = await getRecipesByUserId(userId);
		if (response.isSuccess) {
			let userRecipes = response.data;

			if (filter === "newest") {
				userRecipes = userRecipes.sort(
					(a: Recipe, b: Recipe) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			} else {
				userRecipes = userRecipes.sort(
					(a: Recipe, b: Recipe) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			}

			setHasMore(visibleRecipes.length > userRecipes.length);
			setVisibleRecipes(() => [...userRecipes.slice(0, page * 5)]);
		}
	};

	const handleLoadMore = () => {
		if (hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	};
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return { visibleRecipes, handleLoadMore, hasMore };
};

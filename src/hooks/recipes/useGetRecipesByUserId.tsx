import { Recipe } from "@/models/recipe.model";
import { recipeStore } from "@/zustand/recipe.store";
import { useEffect, useState } from "react";

const recipesPerPage = 3;

export const useGetRecipesByUserId = (userId: string | undefined, filter: "newest" | "oldest") => {
	const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const { getRecipesByUserId } = recipeStore((state) => state);

	const fetchData = async () => {
		try {
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

				const updatedRecipes = [...userRecipes.slice(0 * recipesPerPage, page * recipesPerPage)];

				setVisibleRecipes(updatedRecipes);
				setHasMore(updatedRecipes.length < userRecipes.length);
			}
		} catch (error) {
			console.error("Error fetching recipes:", error);
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
	}, [page, filter]);

	return { visibleRecipes, handleLoadMore, hasMore };
};

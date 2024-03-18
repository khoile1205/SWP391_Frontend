import { recipeStore } from "@/zustand/recipe.store";
import userStore from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";
import { useAuthenticateFeature } from "../common";
import { showToast } from "@/utils/notify";

export const useGetFavouriteRecipes = () => {
	const { user } = userStore((state) => state);
	const { getUserFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);

	const { data } = useQuery({
		queryKey: ["favourite-recipes"],
		queryFn: async () => {
			return (await getUserFavoriteRecipe(user?.id as string)).data;
		},
		retry: false,
		retryDelay: 0,
	});

	const handleRemoveFavoriteRecipe = useAuthenticateFeature(async (recipeId: string) => {
		const response = await removeFavoriteRecipe(recipeId);
		showToast(response.isSuccess ? "success" : "error", response.message!);
	});
	return { data, handleRemoveFavoriteRecipe };
};

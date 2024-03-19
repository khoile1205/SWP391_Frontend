import { Recipe } from "@/models/recipe.model";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetChefRecipes = (chefId: string) => {
	const { getChefRecipes } = bookingStore((state) => state);
	const { data, refetch } = useQuery({
		queryKey: ["getChefRecipes"],
		queryFn: async () => {
			if (chefId) {
				const response = await getChefRecipes(chefId);
				return response.data ?? [];
			}
		},
		retry: true,
		retryDelay: 0,
	});

	return { recipes: data as Recipe[], refetchListRecipes: refetch };
};

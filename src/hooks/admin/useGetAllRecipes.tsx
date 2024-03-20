import { Recipe } from "@/models/recipe.model";
import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRecipes = () => {
	const { getAllRecipes } = adminStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getAllRecipes"],
		queryFn: async () => (await getAllRecipes()).data,
		retry: false,
		retryDelay: 0,
	});

	return { data: data as Recipe[] };
};

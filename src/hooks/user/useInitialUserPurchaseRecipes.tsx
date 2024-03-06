import userStore from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";

export const useInitialUserPurchaseRecipes = () => {
	const { listUserPurcharseRecipe, getListPurchaseRecipe } = userStore((state) => state);
	useQuery({
		queryKey: ["userPurchaseRecipes"],
		queryFn: async () => {
			if (listUserPurcharseRecipe.length) return;
			const result = await getListPurchaseRecipe();
			return result;
		},
		retry: false,
		retryDelay: 0,
	});
};

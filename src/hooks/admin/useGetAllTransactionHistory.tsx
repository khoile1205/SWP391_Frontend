import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTransactionHistory = () => {
	const { getAllTransationHistory } = adminStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getAllTransaction"],
		queryFn: async () => {
			const response = await getAllTransationHistory();
			return response.data;
		},
		retry: false,
		retryDelay: 0,
	});

	return { data };
};

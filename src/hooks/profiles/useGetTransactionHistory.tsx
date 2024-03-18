import { Transaction } from "@/models/transaction.model";
import userStore from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionHistory = () => {
	const { user, getUserTransaction } = userStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getTransactionHistory", user?.id],
		queryFn: async () => {
			const result = await getUserTransaction();
			return result.isSuccess ? (result.data as Transaction[]) : [];
		},
		retry: false,
		retryDelay: 0,
	});

	return { data };
};

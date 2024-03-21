import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";

export const useAdminAccountManagement = () => {
	const { getAllAccounts, lockAccount, unlockAccount } = adminStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getAllAccounts"],
		queryFn: async () => (await getAllAccounts()).data,
		retry: false,
		retryDelay: 0,
	});

	return { data, lockAccount, unlockAccount };
};

import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";

export const useAdminBecomeChefManagement = () => {
	const { getAllBecomeChefRequests, verifyBecomeChefRequests } = adminStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getAllBecomeChefRequests"],
		queryFn: async () => (await getAllBecomeChefRequests()).data,
		retry: false,
		retryDelay: 0,
	});

	return { data: data, verifyBecomeChefRequests: verifyBecomeChefRequests };
};

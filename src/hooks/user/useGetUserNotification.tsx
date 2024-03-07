import userStore from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNotification = () => {
	const { getUserNotification } = userStore((state) => state);
	useQuery({
		queryKey: ["userNotification"],
		queryFn: async () => await getUserNotification(),
		retry: false,
		retryDelay: 0,
	});
};

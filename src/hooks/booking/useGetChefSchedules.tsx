import { ChefBookingSchedule } from "@/types/booking";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetChefSchedules = (chefId: string) => {
	const { getChefSchedules } = bookingStore((state) => state);
	const { data, refetch } = useQuery({
		queryKey: ["getChefSchedules"],
		queryFn: async () => {
			if (chefId) {
				const response = await getChefSchedules(chefId);
				return response.data ?? [];
			}
		},
		retry: true,
		retryDelay: 0,
	});

	return { listSchedules: data as ChefBookingSchedule[], refetchListChefSchedules: refetch };
};

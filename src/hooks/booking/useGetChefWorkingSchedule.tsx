import { Booking } from "@/models/booking.model";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetChefWorkingSchedule = (chefId: string) => {
	const { getChefWorkingSchedule } = bookingStore((state) => state);
	const { data, refetch } = useQuery({
		queryKey: ["getChefSchedules"],
		queryFn: async () => {
			if (chefId) {
				const response = await getChefWorkingSchedule(chefId);
				return response.data ?? [];
			}
		},
		retry: true,
		retryDelay: 0,
	});

	return { data: data as Booking[], refetchListChefSchedules: refetch };
};

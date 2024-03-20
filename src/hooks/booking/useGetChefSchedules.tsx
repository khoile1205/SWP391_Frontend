import { Booking } from "@/models/booking.model";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetChefSchedules = (chefId: string) => {
	const { getChefSchedules } = bookingStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getChefSchedules", chefId],
		queryFn: async () => {
			if (chefId) {
				const response = await getChefSchedules();
				return response.data ?? [];
			}
		},
		retry: true,
		retryDelay: 0,
	});

	return { data: data as Booking[] };
};

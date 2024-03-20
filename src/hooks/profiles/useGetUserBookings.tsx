import { Booking } from "@/models/booking.model";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBookings = () => {
	const { getUserBookings } = bookingStore((state) => state);
	const { data, isLoading } = useQuery({
		queryKey: ["getUserBookings"],
		queryFn: async () => {
			const response = await getUserBookings();
			return response.data;
		},
		retry: false,
		retryDelay: 0,
	});

	return { data: data as Booking[], isLoading };
};

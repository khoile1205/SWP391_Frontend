import { Booking } from "@/models/booking.model";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetBookingById = (bookingId: string) => {
	const { getBookingDetailById } = bookingStore((state) => state);
	const { data } = useQuery({
		queryKey: ["getBookingDetail", bookingId],
		queryFn: async () => {
			if (bookingId) {
				const response = await getBookingDetailById(bookingId);
				return response.data;
			}
		},
		retry: true,
		retryDelay: 0,
	});

	return { data: data as Booking };
};

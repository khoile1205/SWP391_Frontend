import { ChefBookingEntity } from "@/types/booking";
import bookingStore from "@/zustand/booking.store";
import { useQuery } from "@tanstack/react-query";

export const useGetBookingChef = () => {
	const { getAllChefs } = bookingStore((state) => state);

	const { data } = useQuery({
		queryKey: ["getAllChefs"],
		queryFn: async () => {
			const response = await getAllChefs();
			return (response.data as ChefBookingEntity[]) || [];
		},
	});
	return { chefs: data };
};

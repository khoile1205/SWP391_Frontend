import { ChefBookingEntity } from "@/types/booking";
import bookingStore from "@/zustand/booking.store";
import userStore from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";

export const useGetBookingChef = () => {
	const { user } = userStore((state) => state);
	const { getAllChefs } = bookingStore((state) => state);

	const { data } = useQuery({
		queryKey: ["getAllChefs"],
		queryFn: async () => {
			const response = await getAllChefs();
			return (response.data as ChefBookingEntity[]).filter((data) => data.id != user?.id) || [];
		},
	});
	return { chefs: data };
};

import { DashboardStatistic } from "@/types/admin";
import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetDashboardStatistics = () => {
	const [dashboardStatistic, setDashboardStatistics] = React.useState<DashboardStatistic>({
		numberStatistic: {
			totalOfBooking: 0,
			totalOfRevenue: 0,
			totalOfViolation: 0,
		},
		chartStatistic: {
			userStatisticList: [],
			chefStatisticList: [],
		},
	});
	const [loading, setLoading] = React.useState<boolean>(true);
	const { getDashboardStatistics } = adminStore((state) => state);
	const { data: response } = useQuery({
		queryKey: ["dashboardStatistic"],
		queryFn: async () => await getDashboardStatistics(),
		retry: false,
		retryDelay: 0,
	});

	React.useEffect(() => {
		if (response) {
			setDashboardStatistics(response.data);
		}
		const timeOut = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timeOut);
	}, [response]);

	return { dashboardStatistic, loading };
};

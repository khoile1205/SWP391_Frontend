export type DashboardStatistic = {
	numberStatistic: {
		totalOfBooking: number;
		totalOfRevenue: number;
		totalOfViolation: number;
	};
	chartStatistic: {
		userStatisticList: ChartUnit[];
		chefStatisticList: ChartUnit[];
	};
};

export type ChartUnit = {
	name: Date;
	uv: number;
	pv: number;
};

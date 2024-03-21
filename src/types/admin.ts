import { ActionStatus } from "@/enums";

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

export type VerifyRecipeDTO = {
	recipeId: string;
	status: ActionStatus;
};

export type VerifyRequestDTO = {
	requestId: string;
	status: ActionStatus;
};

export type LockAccountDTO = {
	userId: string;
	minute: number;
};

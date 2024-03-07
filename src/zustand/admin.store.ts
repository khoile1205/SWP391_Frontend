import { create } from "zustand";
import Result from "./commons/result";
import { adminUsecase } from "@/usecases";

type Action = {
	getDashboardStatistics(): Promise<Result>;
};

export const adminStore = create<Action>(() => ({
	getDashboardStatistics: async () => {
		const res = await adminUsecase.getDashboardStatistics();
		if (res.isSuccess) {
			return Result.success(res.message, res.data);
		}
		return Result.failed(res.message);
	},
}));

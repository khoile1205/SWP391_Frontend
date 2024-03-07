import { create } from "zustand";
import Result from "./commons/result";
import { adminUsecase } from "@/usecases";
import { handleUseCase } from "./commons/handle.usecase";
import { HandleReportDTO } from "@/types/report";

type Action = {
	getDashboardStatistics(): Promise<Result>;
	getAllReports(): Promise<Result>;
	getAllTransationHistory(): Promise<Result>;
	handleReport(data: HandleReportDTO): Promise<Result>;
};

export const adminStore = create<Action>(() => ({
	handleReport: async (data: HandleReportDTO) =>
		await handleUseCase(adminUsecase.handleReport(data)),
	getDashboardStatistics: async () => {
		return await handleUseCase(adminUsecase.getDashboardStatistics());
	},
	getAllReports: async () => {
		return await handleUseCase(adminUsecase.getAllReports());
	},
	getAllTransationHistory: async () => {
		return await handleUseCase(adminUsecase.getAllTransactions());
	},
}));

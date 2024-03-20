import { create } from "zustand";
import Result from "./commons/result";
import { adminUsecase } from "@/usecases";
import { handleUseCase } from "./commons/handle.usecase";
import { HandleReportDTO } from "@/types/report";
import { CreateNotificationDTO } from "@/types/notification";
import { VerifyRecipeDTO } from "@/types/admin";

type Action = {
	getDashboardStatistics(): Promise<Result>;
	getAllReports(): Promise<Result>;
	getAllTransationHistory(): Promise<Result>;
	handleReport(data: HandleReportDTO): Promise<Result>;
	createSystemNotification(data: CreateNotificationDTO): Promise<Result>;
	getAllRecipes(): Promise<Result>;
	handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Result>;
};

export const adminStore = create<Action>(() => ({
	handleVerifyPublicRecipe: async (data: VerifyRecipeDTO) =>
		await handleUseCase(adminUsecase.handleVerifyPublicRecipe(data)),
	getAllRecipes: async () => {
		return await handleUseCase(adminUsecase.getAllRecipes());
	},
	createSystemNotification: async (data: CreateNotificationDTO) =>
		await handleUseCase(adminUsecase.createSystemNotification(data)),
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

import { create } from "zustand";
import Result from "./commons/result";
import { adminUsecase } from "@/usecases";
import { handleUseCase } from "./commons/handle.usecase";
import { HandleReportDTO } from "@/types/report";
import { CreateNotificationDTO } from "@/types/notification";
import { LockAccountDTO, VerifyRecipeDTO, VerifyRequestDTO } from "@/types/admin";

type Action = {
	getDashboardStatistics(): Promise<Result>;
	getAllReports(): Promise<Result>;
	getAllTransationHistory(): Promise<Result>;
	handleReport(data: HandleReportDTO): Promise<Result>;
	createSystemNotification(data: CreateNotificationDTO): Promise<Result>;
	getAllRecipes(): Promise<Result>;
	handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Result>;
	getAllAccounts(): Promise<Result>;
	lockAccount(data: LockAccountDTO): Promise<Result>;
	unlockAccount(userId: string): Promise<Result>;
	getAllBecomeChefRequests(): Promise<Result>;
	verifyBecomeChefRequests(data: VerifyRequestDTO): Promise<Result>;
};

export const adminStore = create<Action>(() => ({
	getAllBecomeChefRequests: async () => {
		return await handleUseCase(adminUsecase.getAllBecomeChefRequests());
	},
	verifyBecomeChefRequests: async (data: VerifyRequestDTO) => {
		return await handleUseCase(adminUsecase.verifyBecomeChefRequests(data));
	},
	unlockAccount: async (userId: string) => await handleUseCase(adminUsecase.unlockAccount(userId)),
	lockAccount: async (data: LockAccountDTO) => await handleUseCase(adminUsecase.lockAccount(data)),
	getAllAccounts: async () => {
		return await handleUseCase(adminUsecase.getAllAccounts());
	},
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

import { AdminDatasource } from "@/datasources/admin.datasource";
import Response from "../auth.usecase/responses/response";
import { HandleReportDTO } from "@/types/report";
import { CreateNotificationDTO } from "@/types/notification";
import { VerifyRecipeDTO } from "@/types/admin";

export abstract class AdminUsecase {
	abstract getDashboardStatistics(): Promise<Response>;
	abstract getAllReports(): Promise<Response>;
	abstract getAllTransactions(): Promise<Response>;
	abstract handleReport(data: HandleReportDTO): Promise<Response>;
	abstract createSystemNotification(data: CreateNotificationDTO): Promise<Response>;
	abstract getAllRecipes(): Promise<Response>;
	abstract handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Response>;
}

export class AdminUsecaseImpl implements AdminUsecase {
	constructor(private readonly adminDatasource: AdminDatasource) {}
	async handleVerifyPublicRecipe(data: VerifyRecipeDTO): Promise<Response> {
		return await this.adminDatasource.handleVerifyPublicRecipe(data);
	}
	async getAllRecipes(): Promise<Response> {
		return await this.adminDatasource.getAllRecipes();
	}
	async createSystemNotification(data: CreateNotificationDTO): Promise<Response> {
		return await this.adminDatasource.handleCreateSystemNotification(data);
	}
	async handleReport(data: HandleReportDTO): Promise<Response> {
		return await this.adminDatasource.handleReport(data);
	}
	async getAllTransactions(): Promise<Response> {
		return await this.adminDatasource.getAllTransactionHistory();
	}
	async getAllReports(): Promise<Response> {
		return await this.adminDatasource.getAllReports();
	}

	async getDashboardStatistics(): Promise<Response> {
		return await this.adminDatasource.getDashboardStatistics();
	}
}

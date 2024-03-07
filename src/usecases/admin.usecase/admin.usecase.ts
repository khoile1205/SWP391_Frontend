import { AdminDatasource } from "@/datasources/admin.datasource";
import Response from "../auth.usecase/responses/response";
import { HandleReportDTO } from "@/types/report";

export abstract class AdminUsecase {
	abstract getDashboardStatistics(): Promise<Response>;
	abstract getAllReports(): Promise<Response>;
	abstract getAllTransactions(): Promise<Response>;
	abstract handleReport(data: HandleReportDTO): Promise<Response>;
}

export class AdminUsecaseImpl implements AdminUsecase {
	constructor(private readonly adminDatasource: AdminDatasource) {}
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

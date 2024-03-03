import { ReportDatasource } from "@/datasources/report.datasource";
import { SendReportDTO } from "@/types/report";
import Response from "../auth.usecase/responses/response";

export abstract class ReportUseCase {
	abstract sendReport(report: SendReportDTO): Promise<Response>;
	abstract getUserReport(): Promise<Response>;
}

export class ReportUseCaseImpl implements ReportUseCase {
	constructor(private readonly reportDatasource: ReportDatasource) {}
	async getUserReport(): Promise<Response> {
		return await this.reportDatasource.getUserReport();
	}
	async sendReport(report: SendReportDTO): Promise<Response> {
		return await this.reportDatasource.sendReport(report);
	}
}

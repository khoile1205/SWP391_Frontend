import { IBecomeChefRequestDatasource } from "@/datasources/become-chef-request.datasource";
import { CreatedBecomeChefRequestDTO } from "@/types/become-chef-request";
import Response from "../auth.usecase/responses/response";

export interface IBecomeChefRequestUseCase {
	createBecomeChefRequest(request: CreatedBecomeChefRequestDTO): Promise<Response>;
	getAllRequests(): Promise<Response>;
	getRequestsByUserId(userId: string): Promise<Response>;
	deleteRequestsById(chefRequestId: string): Promise<Response>;
}

export class BecomeChefRequestUseCase implements IBecomeChefRequestUseCase {
	constructor(private datasource: IBecomeChefRequestDatasource) {}
	async deleteRequestsById(chefRequestId: string): Promise<Response> {
		return await this.datasource.deleteRequestsById(chefRequestId);
	}

	async createBecomeChefRequest(request: CreatedBecomeChefRequestDTO): Promise<Response> {
		return await this.datasource.createBecomeChefRequest(request);
	}

	async getAllRequests(): Promise<Response> {
		return await this.datasource.getAllRequests();
	}

	async getRequestsByUserId(userId: string): Promise<Response> {
		return await this.datasource.getRequestsByUserId(userId);
	}
}

import { AdminDatasource } from "@/datasources/admin.datasource";
import Response from "../auth.usecase/responses/response";

export abstract class AdminUsecase {
	abstract getDashboardStatistics(): Promise<Response>;
}

export class AdminUsecaseImpl implements AdminUsecase {
	constructor(private readonly adminDatasource: AdminDatasource) {}
	async getDashboardStatistics(): Promise<Response> {
		return await this.adminDatasource.getDashboardStatistics();

		// if (!response.isSuccess) return response;

		// const chefPromises = response.data!.chartStatistic.chefStatisticList.map((data: any) => ({
		// 	name: data.name,
		// 	newChef: data.uv,
		// 	totalChef: data.pv,
		// }));

		// const userPromises = response.data!.chartStatistic.userStatisticList.map((data: any) => ({
		// 	name: data.name,
		// 	newUser: data.uv,
		// 	totalUser: data.pv,
		// }));

		// const transformedChefData = await Promise.all(chefPromises);
		// const transformedUserData = await Promise.all(userPromises);

		// return {
		// 	...response,
		// 	data: {
		// 		...response.data,
		// 		chartStatistic: {
		// 			userStatisticList: transformedUserData,
		// 			chefStatisticList: transformedChefData,
		// 		},
		// 	},
		// };
	}
}

import { SearchQuery } from "@/types/search";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class SearchDatasource {
	abstract search(query: SearchQuery): Promise<Response>;
}

export class SearchDatasourceImpl implements SearchDatasource {
	async search(query: SearchQuery): Promise<Response> {
		const response = await apiService.get(`api/search/${query.type}?keyWord=${query.keyword}`);
		if (response.status !== 200) {
			return new Response(false, [], AppString.noResultFoundMessage);
		}
		const result = await response.json();
		return new Response(true, result.result, AppString.success);
	}
}

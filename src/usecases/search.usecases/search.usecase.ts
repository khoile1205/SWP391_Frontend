import { SearchQuery } from "@/types/search";
import Response from "../auth.usecase/responses/response";
import { SearchDatasource } from "@/datasources/search.datasource";

export abstract class SearchUseCase {
	abstract search(query: SearchQuery): Promise<Response>;
}

export class SearchUseCaseImpl implements SearchUseCase {
	constructor(private readonly searchDatasource: SearchDatasource) {}
	async search(query: SearchQuery): Promise<Response> {
		return await this.searchDatasource.search(query);
	}
}

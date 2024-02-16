import { CategoriesDatasource } from "@/datasources/categories.datasource";
import Response from "@/usecases/auth.usecase/responses/response";

abstract class CategoriesUsecase {
	abstract getAllCategories(): Promise<Response>;
}

class CategoriesUsecaseImpl implements CategoriesUsecase {
	constructor(private readonly categoriesDatasource: CategoriesDatasource) {}
	async getAllCategories(): Promise<Response> {
		return await this.categoriesDatasource.getAllCategories();
	}
}

export { CategoriesUsecase, CategoriesUsecaseImpl };

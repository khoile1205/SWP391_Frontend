import { AuthDataSourceImpl } from "@/datasources/auth.datasource";
import { AuthUseCase } from "./auth.usecase/auth.usecase";
import { UserDatasourceImpl } from "@/datasources/user.datasource";
import { UserUseCaseImpl } from "./user.usecase/user.usecase";
import { FileDatasourceImpl } from "@/datasources/file.datasource";
import { FileUseCaseImpl } from "./file.usecase/file.usecase";
import { CategoriesDatasourceImpl } from "@/datasources/categories.datasource";
import { CategoriesUsecaseImpl } from "./catogories.usecase/categories.usecase";
import { BecomeChefRequestUseCase } from "./become-chef-request/become-chef-request.usecase";
import { BecomeChefRequestDatasource } from "@/datasources/become-chef-request.datasource";
import { RecipeUseCase } from "./recipe.usecase/recipe.usecase";
import { RecipeDatasource } from "@/datasources/recipe.datasource";
import { SearchUseCaseImpl } from "./search.usecases/search.usecase";
import { SearchDatasourceImpl } from "@/datasources/search.datasource";
import { CommentUsecaseImpl } from "./comment/comment.usecase";
import { CommentDatasourceImpl } from "@/datasources/comment.datasource";
import { ReactionDatasourceImpl } from "@/datasources/reaction.datasource";
import { ReactionUseCaseImpl } from "./reaction.usecase/reaction.usecase";

const authUseCase = new AuthUseCase(new AuthDataSourceImpl(), new UserDatasourceImpl());
const userUseCase = new UserUseCaseImpl(new UserDatasourceImpl());
const fileUseCase = new FileUseCaseImpl(new FileDatasourceImpl());
const categoriesUsecase = new CategoriesUsecaseImpl(new CategoriesDatasourceImpl());
const becomeChefRequestUseCase = new BecomeChefRequestUseCase(new BecomeChefRequestDatasource());
const recipeUseCase = new RecipeUseCase(
	new RecipeDatasource(),
	new ReactionDatasourceImpl(),
	new UserDatasourceImpl()
);
const searchUseCase = new SearchUseCaseImpl(new SearchDatasourceImpl());
const commentUseCase = new CommentUsecaseImpl(
	new CommentDatasourceImpl(),
	new ReactionDatasourceImpl(),
	new UserDatasourceImpl()
);
const reactionUseCase = new ReactionUseCaseImpl(new ReactionDatasourceImpl());

export {
	authUseCase,
	userUseCase,
	fileUseCase,
	categoriesUsecase,
	becomeChefRequestUseCase,
	recipeUseCase,
	searchUseCase,
	commentUseCase,
	reactionUseCase,
};

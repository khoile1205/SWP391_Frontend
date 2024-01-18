import { AuthDataSourceImpl } from "@/datasources/auth.datasource";
import { AuthUseCase } from "./auth.usecase/auth.usecase";
import { UserDatasourceImpl } from "@/datasources/user.datasource";
import { UserUseCaseImpl } from "./user.usecase/user.usecase";

const authUseCase = new AuthUseCase(new AuthDataSourceImpl(), new UserDatasourceImpl());
const userUseCase = new UserUseCaseImpl(new UserDatasourceImpl());
export { authUseCase, userUseCase };

import { AuthDataSourceImpl } from "@/datasources/auth.datasource";
import { AuthUseCase } from "./auth.usecase/auth.usecase";
import { UserDatasourceImpl } from "@/datasources/user.datasource";
import { UserUseCaseImpl } from "./user.usecase/user.usecase";
import { FileDatasourceImpl } from "@/datasources/file.datasource";
import { FileUseCaseImpl } from "./file.usecase/file.usecase";

const authUseCase = new AuthUseCase(new AuthDataSourceImpl(), new UserDatasourceImpl());
const userUseCase = new UserUseCaseImpl(new UserDatasourceImpl());
const fileUseCase = new FileUseCaseImpl(new FileDatasourceImpl());

export { authUseCase, userUseCase, fileUseCase };

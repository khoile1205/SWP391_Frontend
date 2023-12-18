import { AuthDataSourceImpl } from "@/datasources/auth.datasource";
import { AuthUseCase } from "./auth.usecase/auth.usecase";

const authUseCase = new AuthUseCase(new AuthDataSourceImpl());

export { authUseCase };

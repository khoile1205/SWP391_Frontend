import { AuthDataSource } from "@/datasources/auth.datasource";
import LoginResponse from "./responses/login.response";

class AuthUseCase {
	constructor(private readonly authDatasource: AuthDataSource) {}

	async login(email: string, password: string): Promise<LoginResponse> {
		try {
			return await this.authDatasource.login(email, password);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new LoginResponse(false, "", message);
		}
	}
}

export { AuthUseCase };

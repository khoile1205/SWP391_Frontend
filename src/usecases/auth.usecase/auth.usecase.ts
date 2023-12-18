import { AuthDataSource } from "@/datasources/auth.datasource";
import LoginResonse from "./responses/login.resonse";

class AuthUseCase {
	constructor(private readonly authDatasource: AuthDataSource) {}

	async login(email: string, password: string): Promise<LoginResonse> {
		try {
			return await this.authDatasource.login(email, password);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new LoginResonse(false, "", message);
		}
	}
}

export { AuthUseCase };

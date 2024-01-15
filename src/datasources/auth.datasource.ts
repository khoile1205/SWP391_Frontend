import LoginResponse from "@/usecases/auth.usecase/responses/login.response";
import apiService from "@/utils/apiService";

abstract class AuthDataSource {
	abstract login(email: string, password: string): Promise<LoginResponse>;
}

class AuthDataSourceImpl implements AuthDataSource {
	async login(email: string, password: string): Promise<LoginResponse> {
		const body = {
			username: email,
			password,
		};

		const res = await apiService.post("/auth/login", body);
		const resBody = await res.json();
		const accessToken = resBody.access_token;
		const isSuccess = res.status == 200;
		const message = res.statusText;

		return new LoginResponse(isSuccess, accessToken, message);
	}
}

export { AuthDataSource, AuthDataSourceImpl };

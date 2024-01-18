import LoginResponse from "@/usecases/auth.usecase/responses/login.response";
import apiService from "@/utils/apiService";

abstract class AuthDataSource {
	abstract login(username: string, password: string): Promise<LoginResponse>;
}

class AuthDataSourceImpl implements AuthDataSource {
	async login(userName: string, password: string): Promise<LoginResponse> {
		const body = { userName, password };
		const res = await apiService.post("/api/auth/login", body);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		if (!isSuccess) {
			return new LoginResponse(false, null, message);
		}
		const result = resBody.result;
		const access_token = result.access_token;
		return new LoginResponse(isSuccess, { access_token }, message);
	}
}

export { AuthDataSource, AuthDataSourceImpl };

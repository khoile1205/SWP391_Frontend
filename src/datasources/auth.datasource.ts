import { SignUpInformation, VerifyEmailInformation } from "@/types/auth";
import LoginResponse from "@/usecases/auth.usecase/responses/login.response";
import apiService from "@/utils/apiService";

abstract class AuthDataSource {
	abstract login(username: string, password: string): Promise<LoginResponse>;
	abstract signUp(data: SignUpInformation): Promise<LoginResponse>;
	abstract verifyEmailConfirmation(data: VerifyEmailInformation): Promise<LoginResponse>;
}

class AuthDataSourceImpl implements AuthDataSource {
	async verifyEmailConfirmation(data: VerifyEmailInformation): Promise<LoginResponse> {
		const res = await apiService.get(
			`/api/auth/verify-email?token=${data.token}&email=${data.email}`
		);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		return new LoginResponse(isSuccess, null, message);
	}
	async signUp(data: SignUpInformation): Promise<LoginResponse> {
		const res = await apiService.post("/api/auth/register", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		return new LoginResponse(isSuccess, null, message);
	}

	async login(userName: string, password: string): Promise<LoginResponse> {
		const body = { userName, password };
		const res = await apiService.post("/api/auth/login", body);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		console.log(resBody);
		if (!isSuccess) {
			return new LoginResponse(false, null, message);
		}
		const result = resBody.result;
		const accessToken = result.accessToken;
		return new LoginResponse(isSuccess, { accessToken }, message);
	}
}

export { AuthDataSource, AuthDataSourceImpl };

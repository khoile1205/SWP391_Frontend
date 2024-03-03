import {
	SignUpInformation,
	VerifyEmailInformation,
	IdentifierResetPassword,
	ResetPasswordData,
	OAuth2SignInData,
} from "@/types/auth";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

abstract class AuthDataSource {
	abstract login(username: string, password: string): Promise<Response>;
	abstract signUp(data: SignUpInformation): Promise<Response>;
	abstract verifyEmailConfirmation(data: VerifyEmailInformation): Promise<Response>;
	abstract verifyIdentifierResetPassword(data: IdentifierResetPassword): Promise<Response>;
	abstract sendEmailResetPassword(data: IdentifierResetPassword): Promise<Response>;
	abstract resetPassword(data: ResetPasswordData): Promise<Response>;
	abstract verifyEmailResetPassword(data: VerifyEmailInformation): Promise<Response>;
	abstract signInWithFacebook(data: OAuth2SignInData): Promise<Response>;
	abstract signInWithGoogle(data: OAuth2SignInData): Promise<Response>;
}

class AuthDataSourceImpl implements AuthDataSource {
	async signInWithFacebook(data: OAuth2SignInData): Promise<Response> {
		const res = await apiService.post("/api/auth/sign-in-facebook", data);

		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		if (!isSuccess) {
			return new Response(false, null, message);
		}

		const result = resBody.result;
		const accessToken = result.accessToken;

		return new Response(true, { accessToken }, message);
	}
	async signInWithGoogle(data: OAuth2SignInData): Promise<Response> {
		const res = await apiService.post("/api/auth/sign-in-google", data);

		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		if (!isSuccess) {
			return new Response(false, null, message);
		}
		const result = resBody.result;
		const accessToken = result.accessToken;
		return new Response(isSuccess, { accessToken }, message);
	}
	async verifyEmailResetPassword(data: VerifyEmailInformation): Promise<Response> {
		const res = await apiService.post("/api/auth/reset-password/verify-token", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		return new Response(isSuccess, null, message);
	}
	async resetPassword(data: ResetPasswordData): Promise<Response> {
		const res = await apiService.post("/api/auth/reset-password", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		return new Response(isSuccess, null, message);
	}
	async sendEmailResetPassword(data: IdentifierResetPassword): Promise<Response> {
		const res = await apiService.post("/api/auth/reset-password/send-email", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		return new Response(isSuccess, null, message);
	}
	async verifyIdentifierResetPassword(data: IdentifierResetPassword): Promise<Response> {
		const res = await apiService.post("/api/auth/reset-password/verify-identifier", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		if (!isSuccess) {
			return new Response(false, null, message);
		}

		return new Response(isSuccess, resBody.result, message);
	}
	async verifyEmailConfirmation(data: VerifyEmailInformation): Promise<Response> {
		const res = await apiService.post(`/api/auth/verify-email`, data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		return new Response(isSuccess, null, message);
	}
	async signUp(data: SignUpInformation): Promise<Response> {
		const res = await apiService.post("/api/auth/register", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		return new Response(isSuccess, null, message);
	}

	async login(userName: string, password: string): Promise<Response> {
		const body = { userName, password };
		const res = await apiService.post("/api/auth/login", body);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;
		if (!isSuccess) {
			return new Response(false, null, message);
		}
		const result = resBody.result;
		const accessToken = result.accessToken;
		return new Response(isSuccess, { accessToken }, message);
	}
}

export { AuthDataSource, AuthDataSourceImpl };

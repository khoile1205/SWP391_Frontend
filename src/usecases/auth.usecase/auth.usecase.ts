import { AuthDataSource } from "@/datasources/auth.datasource";
import Response from "./responses/response";
import Cookies from "js-cookie";
import { AppConstant } from "@/utils/constant";
import { UserDatasource } from "@/datasources/user.datasource";
import {
	SignInInformation,
	SignUpInformation,
	VerifyEmailInformation,
	IdentifierResetPassword,
	ResetPasswordData,
	OAuth2SignInData,
} from "@/types/auth";

abstract class IAuthUseCase {
	abstract login(data: SignInInformation): Promise<Response>;
	abstract signUp(data: SignUpInformation): Promise<Response>;
	abstract logOut(): boolean;
	abstract verifyEmailConfirmation(data: VerifyEmailInformation): Promise<Response>;
	abstract verifyIdentifierResetPassword(data: IdentifierResetPassword): Promise<Response>;
	abstract sendEmailResetPassword(data: IdentifierResetPassword): Promise<Response>;
	abstract resetPassword(data: ResetPasswordData): Promise<Response>;
	abstract verifyEmailResetPassword(data: VerifyEmailInformation): Promise<Response>;
	abstract signInWithFacebook(data: OAuth2SignInData): Promise<Response>;
	abstract signInWithGoogle(data: OAuth2SignInData): Promise<Response>;
}

class AuthUseCase implements IAuthUseCase {
	constructor(
		private readonly authDatasource: AuthDataSource,
		private readonly userDatasource: UserDatasource
	) {}
	async signInWithGoogle(data: OAuth2SignInData): Promise<Response> {
		try {
			const response = await this.authDatasource.signInWithGoogle(data);

			if (!response.isSuccess) {
				return new Response(false, null, response.message);
			}

			const expiredTokenTime = 7 * 24 * 60 * 60 * 1000;

			Cookies.set(AppConstant.accessTokenKey, response.data!.accessToken, {
				expires: expiredTokenTime,
				sameSite: "strict",
			});

			const user = await this.userDatasource.getUserProfile();

			return new Response(
				true,
				{
					access_token: response.data!.accessToken,
					user,
				},
				response.message
			);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new Response(false, null, message);
		}
	}
	async signInWithFacebook(data: OAuth2SignInData): Promise<Response> {
		try {
			const response = await this.authDatasource.signInWithFacebook(data);

			if (!response.isSuccess) {
				return new Response(false, null, response.message);
			}

			const expiredTokenTime = 7 * 24 * 60 * 60 * 1000;

			Cookies.set(AppConstant.accessTokenKey, response.data!.accessToken, {
				expires: expiredTokenTime,
				sameSite: "strict",
			});

			const user = await this.userDatasource.getUserProfile();

			return new Response(
				true,
				{
					access_token: response.data!.accessToken,
					user,
				},
				response.message
			);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new Response(false, null, message);
		}
	}
	async verifyEmailResetPassword(data: VerifyEmailInformation): Promise<Response> {
		return await this.authDatasource.verifyEmailResetPassword(data);
	}
	async resetPassword(data: ResetPasswordData): Promise<Response> {
		return await this.authDatasource.resetPassword(data);
	}
	async sendEmailResetPassword(data: IdentifierResetPassword): Promise<Response> {
		return await this.authDatasource.sendEmailResetPassword(data);
	}
	async verifyIdentifierResetPassword(data: IdentifierResetPassword): Promise<Response> {
		return await this.authDatasource.verifyIdentifierResetPassword(data);
	}
	async verifyEmailConfirmation(data: VerifyEmailInformation): Promise<Response> {
		return await this.authDatasource.verifyEmailConfirmation(data);
	}

	async login(data: SignInInformation): Promise<Response> {
		try {
			const response = await this.authDatasource.login(data.username, data.password);

			if (!response.isSuccess) {
				return new Response(false, null, response.message);
			}

			const expiredTokenTime = data.isRemember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

			Cookies.set(AppConstant.accessTokenKey, response.data!.accessToken, {
				expires: expiredTokenTime,
				sameSite: "strict",
			});

			const user = await this.userDatasource.getUserProfile();

			return new Response(
				true,
				{
					access_token: response.data!.accessToken,
					user,
				},
				response.message
			);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new Response(false, null, message);
		}
	}
	async signUp(data: SignUpInformation) {
		return await this.authDatasource.signUp(data);
	}

	logOut() {
		Cookies.remove(AppConstant.accessTokenKey);

		return true;
	}
}

export { AuthUseCase };

import { AuthDataSource } from "@/datasources/auth.datasource";
import LoginResponse from "./responses/login.response";
import Cookies from "js-cookie";
import { AppConstant } from "@/utils/constant";
import { UserDatasource } from "@/datasources/user.datasource";
import { SignInInformation, SignUpInformation, VerifyEmailInformation } from "@/types/auth";

abstract class IAuthUseCase {
	abstract login(data: SignInInformation): Promise<LoginResponse>;
	abstract signUp(data: SignUpInformation): Promise<LoginResponse>;
	abstract logOut(): boolean;
	abstract verifyEmailConfirmation(data: VerifyEmailInformation): Promise<LoginResponse>;
}

class AuthUseCase implements IAuthUseCase {
	constructor(
		private readonly authDatasource: AuthDataSource,
		private readonly userDatasource: UserDatasource
	) {}
	async verifyEmailConfirmation(data: VerifyEmailInformation): Promise<LoginResponse> {
		return await this.authDatasource.verifyEmailConfirmation(data);
	}

	async login(data: SignInInformation): Promise<LoginResponse> {
		try {
			const response = await this.authDatasource.login(data.username, data.password);

			if (!response.isSuccess) {
				return new LoginResponse(false, null, response.message);
			}

			const expiredTokenTime = data.isRemember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

			Cookies.set(AppConstant.accessTokenKey, response.data!.accessToken, {
				expires: expiredTokenTime,
				sameSite: "strict",
			});

			const user = await this.userDatasource.getUserProfile();

			return new LoginResponse(
				true,
				{
					access_token: response.data!.access_token,
					user,
				},
				response.message
			);
		} catch (error) {
			const message = error instanceof Error ? error.message : `${error}`;
			return new LoginResponse(false, null, message);
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

import { AuthDataSource } from "@/datasources/auth.datasource";
import LoginResponse from "./responses/login.response";
import Cookies from "js-cookie";
import { AppConstant } from "@/utils/constant";
import { UserDatasource } from "@/datasources/user.datasource";
class AuthUseCase {
	constructor(
		private readonly authDatasource: AuthDataSource,
		private readonly userDatasource: UserDatasource
	) {}

	async login(username: string, password: string, isRemember: boolean): Promise<LoginResponse> {
		try {
			const response = await this.authDatasource.login(username, password);

			if (!response.isSuccess) {
				return new LoginResponse(false, null, response.message);
			}

			const expiredTokenTime = isRemember ? 24 * 60 * 60 * 1000 * 7 : 24 * 60 * 60 * 1000;

			Cookies.set(AppConstant.accessTokenKey, response.data!.access_token, {
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
}

export { AuthUseCase };

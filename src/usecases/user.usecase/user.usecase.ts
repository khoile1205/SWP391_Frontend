import { UserDatasource } from "@/datasources/user.datasource";
import { User } from "@/models/user.model";
import { ChangePasswordType, UpdateUserInformationType } from "@/types/user";
import { AppConstant } from "@/utils/constant";
import Cookies from "js-cookie";
import Response from "../auth.usecase/responses/response";
abstract class UserUseCase {
	abstract getUserProfile(): Promise<User | null>;
	abstract changePassword(data: ChangePasswordType): Promise<Response>;
	abstract updateUserInformation(data: UpdateUserInformationType): Promise<Response>;
}

class UserUseCaseImpl implements UserUseCase {
	constructor(private readonly userDatasource: UserDatasource) {}

	updateUserInformation(data: UpdateUserInformationType): Promise<Response> {
		return this.userDatasource.updateUserInformation(data);
	}

	async changePassword(data: ChangePasswordType): Promise<Response> {
		return await this.userDatasource.changePassword(data);
	}

	async getUserProfile(): Promise<User | null> {
		const user = await this.userDatasource.getUserProfile();

		if (!user) {
			Cookies.remove(AppConstant.accessTokenKey);
		}

		return user;
	}
}

export { UserUseCaseImpl, UserUseCase };

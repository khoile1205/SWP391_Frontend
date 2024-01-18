import { UserDatasource } from "@/datasources/user.datasource";
import { User } from "@/models/user.model";
import { AppConstant } from "@/utils/constant";
import Cookies from "js-cookie";
abstract class UserUseCase {
	abstract getUserProfile(): Promise<User | null>;
}

class UserUseCaseImpl implements UserUseCase {
	constructor(private readonly userDatasource: UserDatasource) {}
	async getUserProfile(): Promise<User | null> {
		const user = await this.userDatasource.getUserProfile();

		if (!user) {
			Cookies.remove(AppConstant.accessTokenKey);
		}

		return user;
	}
}

export { UserUseCaseImpl, UserUseCase };

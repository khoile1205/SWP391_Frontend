import { User } from "@/models/user.model";
import apiService from "@/utils/apiService";

abstract class UserDatasource {
	abstract getUserProfile(): Promise<User | null>;
}

class UserDatasourceImpl extends UserDatasource {
	async getUserProfile(): Promise<User | null> {
		const response = await apiService.get("/api/user");

		if (response.status !== 200) {
			return null;
		}

		const responseJson = await response.json();
		const user: User = responseJson.result;

		return user;
	}
}

export { UserDatasource, UserDatasourceImpl };

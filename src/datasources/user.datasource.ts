import { User } from "@/models/user.model";
import { ChangePasswordType, UpdateUserInformationType } from "@/types/user";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";

abstract class UserDatasource {
	abstract getUserProfile(): Promise<User | null>;
	abstract changePassword(data: ChangePasswordType): Promise<Response>;
	abstract updateUserInformation(data: UpdateUserInformationType): Promise<Response>;
	abstract getUserById(userId: string): Promise<Response>;
}

class UserDatasourceImpl extends UserDatasource {
	async getUserById(userId: string): Promise<Response> {
		const response = await apiService.get(`/api/user/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;

		return new Response(isSuccess, resBody.result, message);
	}
	async updateUserInformation(data: UpdateUserInformationType): Promise<Response> {
		const res = await apiService.patch("/api/user", data);
		const isSuccess = res.status === 200;
		if (!isSuccess) return new Response(false, null, "Error updating profile. Please try again.");

		const resBody = await res.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
	async changePassword(data: ChangePasswordType): Promise<Response> {
		const res = await apiService.patch("/api/user/password", data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		return new Response(isSuccess, null, message);
	}
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

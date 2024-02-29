import { User } from "@/models/user.model";
import { ChangePasswordType, UpdateUserInformationType } from "@/types/user";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

const API_User = "/api/user";
abstract class UserDatasource {
	abstract getUserProfile(): Promise<User | null>;
	abstract changePassword(data: ChangePasswordType): Promise<Response>;
	abstract updateUserInformation(data: UpdateUserInformationType): Promise<Response>;
	abstract getUserById(userId: string): Promise<Response>;
	abstract getFollowerByUserId(userId: string): Promise<Response>;
	abstract getFollowingByUserId(userId: string): Promise<Response>;
	abstract followUser(userId: string): Promise<Response>;
	abstract unfollowUser(userId: string): Promise<Response>;
}

class UserDatasourceImpl extends UserDatasource {
	async unfollowUser(userId: string): Promise<Response> {
		const response = await apiService.delete(`${API_User}/follow/${userId}`);
		const isSuccess = response.ok === true;

		return new Response(
			isSuccess,
			null,
			!isSuccess ? AppString.deleteDataErrorMessage : AppString.unfollowSuccessMessage
		);
	}
	async followUser(userId: string): Promise<Response> {
		const response = await apiService.post(`${API_User}/follow/${userId}`, {});
		const isSuccess = response.ok === true;
		return new Response(
			isSuccess,
			null,
			!isSuccess ? AppString.deleteDataErrorMessage : AppString.followSuccessMessage
		);
	}
	async getFollowerByUserId(userId: string): Promise<Response> {
		const response = await apiService.get(`${API_User}/followers/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;

		return new Response(isSuccess, resBody.result, message);
	}
	async getFollowingByUserId(userId: string): Promise<Response> {
		const response = await apiService.get(`${API_User}/following/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;

		return new Response(isSuccess, resBody.result, message);
	}
	async getUserById(userId: string): Promise<Response> {
		const response = await apiService.get(`${API_User}/${userId}`);
		const isSuccess = response.status === 200;
		const resBody = await response.json();
		const message = resBody.message;

		return new Response(isSuccess, resBody.result, message);
	}
	async updateUserInformation(data: UpdateUserInformationType): Promise<Response> {
		const res = await apiService.patch(`${API_User}`, data);
		const isSuccess = res.status === 200;
		if (!isSuccess) return new Response(false, null, "Error updating profile. Please try again.");

		const resBody = await res.json();
		const message = resBody.message;

		return new Response(true, resBody.result, message);
	}
	async changePassword(data: ChangePasswordType): Promise<Response> {
		const res = await apiService.patch(`${API_User}/password`, data);
		const isSuccess = res.status === 200;
		const resBody = await res.json();
		const message = resBody.message;

		return new Response(isSuccess, null, message);
	}
	async getUserProfile(): Promise<User | null> {
		const response = await apiService.get(`${API_User}`);

		if (response.status !== 200) {
			return null;
		}

		const responseJson = await response.json();
		const user: User = responseJson.result;

		return user;
	}
}

export { UserDatasource, UserDatasourceImpl };

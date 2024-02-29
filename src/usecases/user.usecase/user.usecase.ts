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
	abstract getUserById(userId: string): Promise<Response>;
	abstract getFollowerByUserId(userId: string): Promise<Response>;
	abstract getFollowingByUserId(userId: string): Promise<Response>;
	abstract followUser(userId: string): Promise<Response>;
	abstract unfollowUser(userId: string): Promise<Response>;
}

class UserUseCaseImpl implements UserUseCase {
	constructor(private readonly userDatasource: UserDatasource) {}
	async unfollowUser(userId: string): Promise<Response> {
		return await this.userDatasource.unfollowUser(userId);
	}
	async followUser(userId: string): Promise<Response> {
		return await this.userDatasource.followUser(userId);
	}
	async getFollowerByUserId(userId: string): Promise<Response> {
		return await this.userDatasource.getFollowerByUserId(userId);
	}
	async getFollowingByUserId(userId: string): Promise<Response> {
		return await this.userDatasource.getFollowingByUserId(userId);
	}
	async getUserById(userId: string): Promise<Response> {
		const result = await this.userDatasource.getUserById(userId);
		if (!result.data) {
			return result;
		}
		const user = result.data as User;
		const userFollower = await this.userDatasource.getFollowerByUserId(user.id);
		const userFollowing = await this.userDatasource.getFollowingByUserId(user.id);

		return {
			...result,
			data: {
				...user,
				followers: userFollower.data as User[],
				followings: userFollowing.data as User[],
			},
		};
	}

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
			return user;
		}

		const userFollower = await this.userDatasource.getFollowerByUserId(user.id);
		const userFollowing = await this.userDatasource.getFollowingByUserId(user.id);

		return {
			...user,
			followers: userFollower.data as User[],
			followings: userFollowing.data as User[],
		};
	}
}

export { UserUseCaseImpl, UserUseCase };

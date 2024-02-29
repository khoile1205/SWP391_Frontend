import { User } from "@/models/user.model";
import { create } from "zustand";
import { ErrorState } from "@/zustand/commons/error.state";
import { authUseCase, userUseCase } from "@/usecases";
import Result from "./commons/result";
import { OAuth2SignInData, SignInInformation, SignUpInformation } from "@/types/auth";
import { ChangePasswordType, UpdateUserInformationType } from "@/types/user";
import { handleUseCase } from "./commons/handle.usecase";
import Response from "@/usecases/auth.usecase/responses/response";

type UserStore = {
	user: User | null;
	error: ErrorState | null;
	updateUser: (user: User | null) => void;
	login: (data: SignInInformation) => Promise<Result>;
	signUp: (data: SignUpInformation) => Promise<Result>;
	getUserProfile(): Promise<User | null>;
	logOut(): boolean;
	changePassword(data: ChangePasswordType): Promise<Result>;
	updateUserInformation(data: UpdateUserInformationType): Promise<Result>;
	signInWithFacebook(data: OAuth2SignInData): Promise<Result>;
	signInWithGoogle(data: OAuth2SignInData): Promise<Result>;
	handleSignIn(signInMethod: () => Promise<Response>): Promise<Result>;
	getUserById(userId: string): Promise<Result>;
	getFollowerByUserId(userId: string): Promise<Result>;
	getFollowingByUserId(userId: string): Promise<Result>;
	followUser(userId: string): Promise<Result>;
	unfollowUser(userId: string): Promise<Result>;
};

const userStore = create<UserStore>()((set, get) => ({
	user: null,
	error: null,
	updateUser: (user: User | null) => set(() => ({ user: user })),
	handleSignIn: async (signInMethod: () => Promise<Response>) => {
		const { message = "", data, isSuccess } = await signInMethod();

		if (!isSuccess) {
			set(() => ({
				error: {
					message,
				},
			}));
			return Result.failed(message);
		}

		set(() => ({
			user: data!.user,
		}));

		return Result.success(message);
	},
	login: async (signInInfo: SignInInformation) => {
		return await get().handleSignIn(() => authUseCase.login(signInInfo));
	},
	signInWithFacebook: async (body: OAuth2SignInData) => {
		return await get().handleSignIn(() => authUseCase.signInWithFacebook(body));
	},
	signInWithGoogle: async (body: OAuth2SignInData) => {
		return await get().handleSignIn(() => authUseCase.signInWithGoogle(body));
	},
	signUp: async (data: SignUpInformation) => {
		return handleUseCase(authUseCase.signUp(data));
	},
	getUserProfile: async () => {
		const user = await userUseCase.getUserProfile();
		set(() => ({
			user,
		}));

		return user;
	},
	logOut: () => {
		const result = authUseCase.logOut();

		if (result)
			set(() => ({
				user: null,
			}));

		return result;
	},
	changePassword: async (data: ChangePasswordType) => {
		return handleUseCase(userUseCase.changePassword(data));
	},
	updateUserInformation: async (data: UpdateUserInformationType) => {
		const result = await handleUseCase(userUseCase.updateUserInformation(data));
		if (result.isSuccess) {
			set(() => ({
				user: result.data as User,
			}));
		}

		return result;
	},
	getUserById: async (userId: string) => {
		return await handleUseCase(userUseCase.getUserById(userId));
	},
	getFollowerByUserId: async (userId: string) => {
		return await handleUseCase(userUseCase.getFollowerByUserId(userId));
	},
	getFollowingByUserId: async (userId: string) => {
		return await handleUseCase(userUseCase.getFollowingByUserId(userId));
	},
	followUser: async (userId: string) => {
		return await handleUseCase(userUseCase.followUser(userId));
	},
	unfollowUser: async (userId: string) => {
		return await handleUseCase(userUseCase.unfollowUser(userId));
	},
}));

export default userStore;

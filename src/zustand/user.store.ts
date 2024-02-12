import { User } from "@/models/user.model";
import { create } from "zustand";
import { ErrorState } from "@/zustand/commons/error.state";
import { authUseCase, userUseCase } from "@/usecases";
import Result from "./commons/result";
import { OAuth2SignInData, SignInInformation, SignUpInformation } from "@/types/auth";
import { ChangePasswordType, UpdateUserInformationType } from "@/types/user";
import { handleUseCase } from "./commons/handle.usecase";

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
};

const userStore = create<UserStore>()((set) => ({
	user: null,
	error: null,
	updateUser: (user: User | null) => set(() => ({ user: user })),
	login: async (signInInfo: SignInInformation) => {
		const { message, data, isSuccess } = await authUseCase.login(signInInfo);

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
	signInWithFacebook: async (body: OAuth2SignInData) => {
		const { message, data, isSuccess } = await authUseCase.signInWithFacebook(body);

		console.log(data);
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
	signInWithGoogle: async (body: OAuth2SignInData) => {
		const { message, data, isSuccess } = await authUseCase.signInWithGoogle(body);

		console.log(data);
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
}));

export default userStore;

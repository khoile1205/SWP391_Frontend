import { User } from "@/models/user.model";
import { create } from "zustand";
import { ErrorState } from "@/zustand/commons/error.state";
import { authUseCase, userUseCase } from "@/usecases";
import Result from "./commons/result";
import { SignInInformation, SignUpInformation } from "@/types/auth";

type UserStore = {
	user: User | null;
	error: ErrorState | null;
	updateUser: (user: User | null) => void;
	login: (data: SignInInformation) => Promise<Result>;
	signUp: (data: SignUpInformation) => Promise<Result>;
	getUserProfile(): Promise<User | null>;
	logOut(): boolean;
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
		const signUpResponse = await authUseCase.signUp(data);
		if (signUpResponse.isSuccess) {
			return Result.success(signUpResponse.message);
		}
		return Result.failed(signUpResponse.message);
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
}));

export default userStore;

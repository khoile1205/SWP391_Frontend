import { User } from "@/models/user.model";
import { create } from "zustand";
import { ErrorState } from "@/zustand/commons/error.state";
import { authUseCase, userUseCase } from "@/usecases";
import { AppConstant } from "@/utils/constant";
import Cookies from "js-cookie";

type UserStore = {
	user: User | null;
	error: ErrorState | null;
	updateUser: (user: User | null) => void;
	login: (username: string, password: string, isRemember: boolean) => Promise<boolean>;
	// signup: (username: string, password: string) => Promise<Result>;
	getUserProfile(): Promise<User | null>;
	logOut(): boolean;
};

const userStore = create<UserStore>()((set) => ({
	user: null,
	error: null,
	updateUser: (user: User | null) => set(() => ({ user: user })),
	login: async (username: string, password: string, isRemember: boolean) => {
		const { message, data, isSuccess } = await authUseCase.login(username, password, isRemember);

		if (!isSuccess) {
			set(() => ({
				error: {
					message,
				},
			}));
			return false;
		}

		set(() => ({
			user: data!.user,
		}));

		return true;
	},
	// signup: async (email: string, password: string) => {
	// 	const loginResponse = await authUseCase.login(email, password);
	// 	return Result.failed(loginResponse.message);
	// },
	getUserProfile: async () => {
		const user = await userUseCase.getUserProfile();
		set(() => ({
			user,
		}));

		return user;
	},
	logOut: () => {
		Cookies.remove(AppConstant.accessTokenKey);

		set(() => ({
			user: null,
		}));

		return true;
	},
}));

export default userStore;

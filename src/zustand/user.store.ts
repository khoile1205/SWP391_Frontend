import { User, getDefaultUserFields } from "@/models/user.model";
import { create } from "zustand";
import { ErrorState } from "@/zustand/commons/error.state";
import Result from "@/zustand/commons/result";
import { authUseCase } from "@/usecases";
type UserStore = {
	user: User | null;
	error: ErrorState | null;
	updateUser: (user: User | null) => void;
	login: (username: string, password: string) => Promise<Result>;
	signup: (username: string, password: string) => Promise<Result>;
};

const userStore = create<UserStore>()((set) => ({
	user: null,
	error: null,
	updateUser: (user: User | null) => set(() => ({ user: user })),
	login: async (email: string, password: string) => {
		const loginResponse = await authUseCase.login(email, password);
		if (loginResponse.isSuccess) {
			set(() => ({
				user: {
					...getDefaultUserFields(),
					email: email,
					password: password,
				},
				error: null,
			}));
			return Result.success();
		}

		set(() => ({
			user: null,
			error: {
				message: loginResponse.message,
			},
		}));
		return Result.failed(loginResponse.message);
	},
	signup: async (email: string, password: string) => {
		const loginResponse = await authUseCase.login(email, password);
		return Result.failed(loginResponse.message);
	},
}));

export default userStore;

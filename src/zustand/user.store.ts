import { User } from "@/models/user.model";
import { create } from "zustand";

type UserStore = {
	user: User | null;
	updateUser: (user: User | null) => void;
};

const userStore = create<UserStore>()((set) => ({
	user: null,
	updateUser: (user: User | null) => set(() => ({ user: user })),
}));

export default userStore;

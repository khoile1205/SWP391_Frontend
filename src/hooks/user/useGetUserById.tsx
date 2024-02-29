import { User } from "@/models/user.model";
import userStore from "@/zustand/user.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetUserById = (userId: string | undefined) => {
	const [user, setUser] = useState<User | null>();

	const { getUserById } = userStore((state) => state);
	useEffectOnce(() => {
		const fetchData = async () => {
			if (!userId) return;
			const response = await getUserById(userId);
			console.log(response);
			if (response.isSuccess) {
				setUser(response.data);
			}
		};
		fetchData();
	});

	return { user };
};

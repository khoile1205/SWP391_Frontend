import { User } from "@/models/user.model";
import userStore from "@/zustand/user.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetUserById = (userId: string | undefined) => {
	const [user, setUser] = useState<User | null>();

	const { getUserById } = userStore((state) => state);
	const fetchData = async () => {
		if (!userId) return;
		const response = await getUserById(userId);
		if (response.isSuccess) {
			setUser(response.data);
		}
	};

	useEffectOnce(() => {
		fetchData();
	});
	const refetch = () => fetchData();
	return { user, refetch };
};

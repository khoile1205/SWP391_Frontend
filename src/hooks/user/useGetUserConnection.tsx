import { User } from "@/models/user.model";
import userStore from "@/zustand/user.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetUserConnections = (
	userId: string | undefined,
	type: "follower" | "following"
) => {
	const [data, setData] = useState<User[]>([]);
	const [count, setCount] = useState<number>(0);
	const { getFollowerByUserId, getFollowingByUserId } = userStore((state) => state);
	const getUserConnections = async () => {
		if (userId === undefined) {
			return;
		}

		const response =
			type === "follower" ? await getFollowerByUserId(userId) : await getFollowingByUserId(userId);

		if (response.isSuccess) {
			setData(response.data);
			setCount(response.data.length);
		}
	};

	useEffectOnce(() => {
		getUserConnections();
	});

	return { data, setData, count, setCount };
};

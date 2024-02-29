import { BecomeChefRequest } from "@/models/become-chef-request.model";
import { becomeChefRequestStore } from "@/zustand/become-chef-request";
import { useLoadingStore } from "@/zustand/loading.store";
import userStore from "@/zustand/user.store";
import { useEffect, useState } from "react";

export const useUserChefRequest = () => {
	const [request, setRequest] = useState<BecomeChefRequest>();
	const { setLoading } = useLoadingStore((state) => state);
	const { getRequestByUserId } = becomeChefRequestStore((state) => state);
	const { user } = userStore((state) => state);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const response = await getRequestByUserId(user?.id as string);
			if (response.isSuccess) {
				setRequest(response.data);
			}
			setLoading(false);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setLoading]);

	return { request };
};

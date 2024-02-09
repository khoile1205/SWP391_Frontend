import { AppConstant } from "@/utils/constant";
import userStore from "@/zustand/user.store";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useUserAuthentication = () => {
	const { user, getUserProfile } = userStore((state) => state);

	useEffect(() => {
		const getUserData = async () => await getUserProfile();

		// Check user is existed
		if (user) return;

		// Check BearerToken is existed
		const bearerToken = Cookies.get(AppConstant.accessTokenKey);
		if (bearerToken) {
			getUserData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export { useUserAuthentication };

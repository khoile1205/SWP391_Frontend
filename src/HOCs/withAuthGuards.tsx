import { AuthGuards } from "@/types/auth";
import AppString from "@/utils/app-string";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WithAuthGuard = ({ children }: AuthGuards) => {
	const { user } = userStore((state) => state);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			showToast("error", AppString.accessDenied);
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	return children;
};

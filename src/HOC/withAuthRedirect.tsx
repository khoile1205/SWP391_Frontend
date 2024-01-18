import { ComponentType } from "react";
import userStore from "@/zustand/user.store";
import router from "@/routes";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";

export function withAuthRedirect(WrappedComponent: ComponentType) {
	const AuthRedirect: React.FC = (props) => {
		const { user } = userStore((state) => state);

		if (user) {
			// If the user is already authenticated, redirect to the home page
			router.navigate("/");
			showToast("warning", AppString.alreadyLoggedIn);
		}

		// If the user is not authenticated, render the WrappedComponent
		return <WrappedComponent {...props} />;
	};

	return AuthRedirect;
}

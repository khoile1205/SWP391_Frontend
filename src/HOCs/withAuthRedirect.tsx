import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FunctionComponent, ComponentType } from "react";
import AppString from "@/utils/app-string";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";

function withAuthRedirect(WrappedComponent: ComponentType): FunctionComponent {
	return (props) => {
		const { user } = userStore();
		const navigate = useNavigate();

		useEffect(() => {
			if (user) {
				showToast("warning", AppString.alreadyLoggedIn);
				navigate("/");
			}
		}, [user, navigate]);

		if (user) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};
}

export default withAuthRedirect;

import { FunctionComponent, ComponentType, useEffect } from "react";
import userStore from "@/zustand/user.store";
import Cookies from "js-cookie";
import { AppConstant } from "@/utils/constant";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function withAuthProvider(WrappedComponent: ComponentType) {
	const AuthProvider: FunctionComponent = (props) => {
		const { getUserProfile } = userStore((state) => state);

		useEffect(() => {
			const bearerToken = Cookies.get(AppConstant.accessTokenKey);
			if (bearerToken) getUserProfile();
		}, [getUserProfile]);

		return (
			<>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Slide}
				/>
				<WrappedComponent {...props} />;
			</>
		);
	};

	return AuthProvider;
}

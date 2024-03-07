import { useUserAuthentication } from "@/hooks/auth";
import { useCategories } from "@/hooks/category";
import { useGetUserNotification, useInitialUserPurchaseRecipes } from "@/hooks/user";
import { useInitializeUserReaction } from "@/hooks/user/useInitializeUserReaction";
import { FunctionComponent, ComponentType } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function withAuthProvider(WrappedComponent: ComponentType) {
	const AuthProvider: FunctionComponent = (props) => {
		useCategories();
		useUserAuthentication();
		useGetUserNotification();
		useInitializeUserReaction();
		useInitialUserPurchaseRecipes();
		return (
			<>
				<ToastContainer
					position="top-right"
					autoClose={2000}
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
				<WrappedComponent {...props} />
			</>
		);
	};

	return AuthProvider;
}

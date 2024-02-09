import { FunctionComponent, ComponentType } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";

export function withAuthProvider(WrappedComponent: ComponentType) {
	const AuthProvider: FunctionComponent = (props) => {
		useUserAuthentication();

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

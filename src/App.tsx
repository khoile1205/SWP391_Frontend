import { BrowserRouter } from "react-router-dom";
import i18nInit from "./i18n/init-i18n";
import { Footer, Header } from "./ui/components";
import { withAuthProvider } from "./HOCs/withAuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { useLoadingStore } from "./zustand/loading.store";
import { Loading } from "./ui/components/Loading";
import MainRoutes from "./routes/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CreateReportModal from "./ui/section/ReportModal";
import React from "react";

i18nInit();

function App() {
	const { isLoading } = useLoadingStore((state) => state);
	React.useEffect(() => {
		document.title = "Nest Cooking";
	}, []);
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
			{isLoading && <Loading></Loading>}
			<div className="container mx-auto max-w-7xl sm:px-6 lg:px-8">
				<Header></Header>
				<div className="mt-2 px-4 sm:px-0">
					<BrowserRouter>
						<MainRoutes />
						<CreateReportModal></CreateReportModal>
					</BrowserRouter>
				</div>
			</div>
			<div
				style={{
					backgroundColor: "#f9f9f9",
				}}
				className="mt-10"
			>
				<Footer></Footer>
			</div>
		</GoogleOAuthProvider>
	);
}

const AppWithAuth = withAuthProvider(App);

export default AppWithAuth;

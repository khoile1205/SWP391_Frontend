import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import i18nInit from "./i18n/init-i18n";
import { Footer, Header } from "./ui/components";

i18nInit();

function App() {
	return (
		<>
			<div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<Header></Header>
				<RouterProvider router={router} />
			</div>
			<div
				style={{
					backgroundColor: "#f9f9f9",
				}}
			>
				<Footer></Footer>
			</div>
		</>
	);
}

export default App;

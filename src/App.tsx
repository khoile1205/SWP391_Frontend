import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import i18nInit from "./i18n/init-i18n";

i18nInit();

function App() {
	return (
		<div className="h-1000">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;

import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import i18nInit from "./i18n/init-i18n";

i18nInit();

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

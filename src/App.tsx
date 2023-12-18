import { RouterProvider } from "react-router-dom";
import router from "./routes/index.ts";
import i18nInit from "./i18n/init-i18n.ts";

i18nInit();

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

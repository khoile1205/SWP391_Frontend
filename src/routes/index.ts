import { LoginPage, HomePage } from "@/ui/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				path: "",
				element: HomePage(),
			},
		],
	},
	{
		path: "/login",
		element: LoginPage(),
	},
]);

export default router;

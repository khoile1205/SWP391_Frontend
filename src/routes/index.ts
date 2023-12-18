import { LoginPage, HomePage } from "@/ui/pages";
import { SignUpPage } from "@/ui/pages/signup.page";
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
	{
		path: "/signup",
		element: SignUpPage(),
	},
]);

export default router;

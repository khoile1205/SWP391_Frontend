import { HomePage, LoginPage } from "@/ui/pages";
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
		path: "/sign-in",
		element: LoginPage(),
	},
	{
		path: "/sign-up",
		element: SignUpPage(),
	},
]);

export default router;

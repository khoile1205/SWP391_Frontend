import { HomePage, LoginPage, PostPage, SignUpPage } from "@/ui/pages";
import { PostDetailPage } from "@/ui/pages/post.detail.page";
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
	{
		path: "/posts",
		element: PostPage(),
		children: [
			{
				path: ":id",
				element: PostDetailPage(),
			},
		],
	},
]);

export default router;

import { Loadable } from "@/ui/components/Loadable";
import { HomePage } from "@/ui/pages/home.page";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import loadable components
const SignInPage = Loadable(lazy(() => import("@/ui/pages/sign-in.page")));
const SignUpPage = Loadable(lazy(() => import("@/ui/pages/sign-up.page")));

// render - Post loadable
const PostPage = Loadable(lazy(() => import("@/ui/pages/posts.page")));
const PostDetailPage = Loadable(lazy(() => import("@/ui/pages/post.detail.page")));

// render - email verification
const VerifyEmailPage = Loadable(lazy(() => import("@/ui/pages/verify-email.page")));

// redner - reset password
const ResetPasswordPage = Loadable(lazy(() => import("@/ui/pages/reset.password.page")));
const ChangePasswordPage = Loadable(lazy(() => import("@/ui/pages/change.password.page")));

const MainRoutes: RouteObject[] = [
	{
		path: "/",
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "reset-password",
				element: <ResetPasswordPage></ResetPasswordPage>,
			},
			{
				path: "change-password",
				element: <ChangePasswordPage></ChangePasswordPage>,
			},
		],
	},
	{
		path: "/sign-in",
		element: <SignInPage></SignInPage>,
	},
	{
		path: "/sign-up",
		element: <SignUpPage></SignUpPage>,
	},
	{
		path: "/verify-email",
		element: <VerifyEmailPage></VerifyEmailPage>,
	},
	{
		path: "/posts",
		children: [
			{
				path: "",
				element: <PostPage></PostPage>,
			},
			{
				path: ":id",
				element: <PostDetailPage></PostDetailPage>,
			},
		],
	},
];

export default MainRoutes;

import ProtectedRoutes from "@/HOCs/ProtectedRoutes";
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
const NotFoundPage = Loadable(lazy(() => import("@/ui/pages/not-found.page")));

// redner - reset password
const ViewDetailRecipePage = Loadable(lazy(() => import("@/ui/pages/view.detail.recipe.page")));

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
		],
	},
	{
		path: "/sign-in",
		element: (
			<ProtectedRoutes>
				<SignInPage></SignInPage>
			</ProtectedRoutes>
		),
	},
	{
		path: "/sign-up",
		element: (
			<ProtectedRoutes>
				<SignUpPage></SignUpPage>
			</ProtectedRoutes>
		),
	},
	{
		path: "/verify-email",
		element: (
			<ProtectedRoutes>
				<VerifyEmailPage></VerifyEmailPage>
			</ProtectedRoutes>
		),
	},
	{
		path: "/view-detail-recipe",
		element: <ViewDetailRecipePage></ViewDetailRecipePage>,
	},
	{
		path: "/recipes",
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
	{
		path: "*",
		element: <NotFoundPage></NotFoundPage>,
	},
];

export default MainRoutes;

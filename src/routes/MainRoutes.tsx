import ProtectedRoutes from "@/HOCs/ProtectedRoutes";
import { Loadable } from "@/ui/components/Loadable";
import { HomePage } from "@/ui/pages/home.page";
import CreateRecipePage from "@/ui/pages/recipes/recipes.create.page";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import loadable components
const SignInPage = Loadable(lazy(() => import("@/ui/pages/sign-in.page")));
const SignUpPage = Loadable(lazy(() => import("@/ui/pages/sign-up.page")));

// render - Post loadable
const RecipePage = Loadable(lazy(() => import("@/ui/pages/recipes/recipes.page")));
const RecipeDetailPage = Loadable(lazy(() => import("@/ui/pages/recipes/recipes.detail.page")));

// render - email verification
const VerifyEmailPage = Loadable(lazy(() => import("@/ui/pages/verify-email.page")));

// redner - reset password
const ResetPasswordPage = Loadable(lazy(() => import("@/ui/pages/reset.password.page")));

// redner - category Page
const RecipeCategoryPage = Loadable(lazy(() => import("@/ui/pages/category/category.recipe")));
const CategoryHomepage = Loadable(lazy(() => import("@/ui/pages/category/category.homepage")));
// render - reset password
const NotFoundPage = Loadable(lazy(() => import("@/ui/pages/not-found.page")));

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
		path: "recipes",
		children: [
			{
				path: "",
				element: <RecipePage></RecipePage>,
			},
			{
				path: "create",
				element: <CreateRecipePage></CreateRecipePage>,
			},
			{
				path: ":recipeId",
				element: <RecipeDetailPage></RecipeDetailPage>,
			},
		],
	},
	{
		path: "category",
		children: [
			{
				path: "",
				element: <CategoryHomepage></CategoryHomepage>,
			},
			{
				path: ":categoryId",
				element: <RecipeCategoryPage></RecipeCategoryPage>,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage></NotFoundPage>,
	},
];

export default MainRoutes;

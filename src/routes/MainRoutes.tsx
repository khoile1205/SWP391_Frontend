import ProtectedRoutes from "@/HOCs/ProtectedRoutes";
import RBACRoutes from "@/HOCs/RBACRoutes";
import { Roles } from "@/enums";
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

// render - user
const UserProfilePage = Loadable(lazy(() => import("@/ui/pages/users/users.profile.page")));

// render - search page
const SearchAllPage = Loadable(lazy(() => import("@/ui/pages/search/search.all.page")));
// const SearchUsersPage = Loadable(lazy(() => import("@/ui/pages/search/search.users.page")));
// const SearchRecipesPage = Loadable(lazy(() => import("@/ui/pages/search/search.recipes.page")));

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
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.CHEF]}>
						<CreateRecipePage></CreateRecipePage>
					</RBACRoutes>
				),
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
		path: "search",
		children: [
			{
				path: ":type",
				element: <SearchAllPage></SearchAllPage>,
			},
			// {
			// 	path: "/recipes",
			// 	element: <SearchRecipesPage></SearchRecipesPage>,
			// },
			// {
			// 	path: "/users",
			// 	element: <SearchUsersPage></SearchUsersPage>,
			// },
		],
	},
	{
		path: "user",
		children: [
			{
				path: ":userId",
				element: <UserProfilePage></UserProfilePage>,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage></NotFoundPage>,
	},
];

export default MainRoutes;

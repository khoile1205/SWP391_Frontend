import RBACRoutes from "@/HOCs/RBACRoutes";
import { Roles } from "@/enums";
import { Loadable } from "@/ui/components/Loadable";
import { MemoizedProfileLayout } from "@/ui/pages/profiles/profile.layout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import loadable components
const ProfilePage = Loadable(lazy(() => import("@/ui/pages/profiles/infomation/profile.page")));
const ChangePasswordPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/change-password/profile.change.password.page"))
);
const ReportsPage = Loadable(lazy(() => import("@/ui/pages/profiles/reports/profile.reports")));
const ProfileBecomeChefPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/requests/profile.become-chef.page"))
);
const TransactionHistoryPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/transaction/profile.transaction.history.page"))
);
const BookingHistoryPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/booking/profile.booking.history.page"))
);
const SchedulesPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/schedules/profile.schedules.page"))
);
const UpdateRecipePage = Loadable(
	lazy(() => import("@/ui/pages/profiles/recipes/profile.recipes.update"))
);
const RecipesPage = Loadable(lazy(() => import("@/ui/pages/profiles/recipes/profile.recipes")));
const ProfileWalletPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/wallet/profile.wallet.page"))
);
const FavouriteRecipesPage = Loadable(
	lazy(() => import("@/ui/pages/profiles/favourite-recipe/profile.favourite-recipes.page"))
);

const UserRoutes: RouteObject[] = [
	{
		path: "/profile",
		element: (
			<RBACRoutes allowedRoles={[Roles.USER, Roles.CHEF]}>
				<MemoizedProfileLayout></MemoizedProfileLayout>
			</RBACRoutes>
		),
		children: [
			{
				path: "",
				element: <ProfilePage></ProfilePage>,
			},
			{
				path: "change-password",
				element: <ChangePasswordPage></ChangePasswordPage>,
			},
			{
				path: "reports",
				element: <ReportsPage></ReportsPage>,
			},
			{
				path: "requests",
				element: <ProfileBecomeChefPage></ProfileBecomeChefPage>,
			},
			{
				path: "transactions",
				element: <TransactionHistoryPage></TransactionHistoryPage>,
			},
			{
				path: "bookings",
				element: <BookingHistoryPage></BookingHistoryPage>,
			},
			{
				path: "schedules",
				element: <SchedulesPage></SchedulesPage>,
			},
			{
				path: "recipes",
				children: [
					{
						path: "",
						element: <RecipesPage></RecipesPage>,
					},
					{
						path: "edit/:recipeId",
						element: <UpdateRecipePage></UpdateRecipePage>,
					},
				],
			},
			{
				path: "wallet",
				element: <ProfileWalletPage></ProfileWalletPage>,
			},
			{
				path: "favourite-recipes",
				element: <FavouriteRecipesPage></FavouriteRecipesPage>,
			},
			{
				path: "favourite-recipes",
				element: <FavouriteRecipesPage></FavouriteRecipesPage>,
			},
		],
	},
];
export default UserRoutes;

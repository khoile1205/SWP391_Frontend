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

const UserRoutes: RouteObject[] = [
	{
		path: "/profile",
		element: <MemoizedProfileLayout></MemoizedProfileLayout>,
		children: [
			{
				path: "",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<ProfilePage></ProfilePage>
					</RBACRoutes>
				),
			},
			{
				path: "change-password",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<ChangePasswordPage></ChangePasswordPage>
					</RBACRoutes>
				),
			},
			{
				path: "reports",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<ReportsPage></ReportsPage>
					</RBACRoutes>
				),
			},
			{
				path: "requests",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN]}>
						<ProfileBecomeChefPage></ProfileBecomeChefPage>
					</RBACRoutes>
				),
			},
			{
				path: "transactions",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<TransactionHistoryPage></TransactionHistoryPage>
					</RBACRoutes>
				),
			},
			{
				path: "bookings",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<BookingHistoryPage></BookingHistoryPage>
					</RBACRoutes>
				),
			},
			{
				path: "schedules",
				element: (
					<RBACRoutes allowedRoles={[Roles.ADMIN, Roles.CHEF]}>
						<SchedulesPage></SchedulesPage>
					</RBACRoutes>
				),
			},
			{
				path: "recipes",
				children: [
					{
						path: "",
						element: (
							<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
								<RecipesPage></RecipesPage>
							</RBACRoutes>
						),
					},
					{
						path: "edit/:recipeId",
						element: (
							<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
								<UpdateRecipePage></UpdateRecipePage>
							</RBACRoutes>
						),
					},
				],
			},
			{
				path: "wallet",
				element: (
					<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
						<ProfileWalletPage></ProfileWalletPage>
					</RBACRoutes>
				),
			},
		],
	},
];
export default UserRoutes;

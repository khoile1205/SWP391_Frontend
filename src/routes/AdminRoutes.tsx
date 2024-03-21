import RBACRoutes from "@/HOCs/RBACRoutes";
import { Roles } from "@/enums";
import { Loadable } from "@/ui/components/Loadable";
import { MemoizedAdminLayout } from "@/ui/pages/admin/admin.layout.page";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const AdminDashboardPage = Loadable(lazy(() => import("@/ui/pages/admin/admin.dashboard.page")));
const AdminRecipePage = Loadable(lazy(() => import("@/ui/pages/admin/admin.recipe.page")));
const AdminReportPage = Loadable(lazy(() => import("@/ui/pages/admin/admin.report.page")));
const AdminTransactionPage = Loadable(
	lazy(() => import("@/ui/pages/admin/admin.transaction.page"))
);
const AdminBookingPage = Loadable(lazy(() => import("@/ui/pages/admin/admin.booking.page")));
const AdminRequestPage = Loadable(
	lazy(() => import("@/ui/pages/admin/admin.become-chef-request.page"))
);
const AdminAccountManagementPage = Loadable(
	lazy(() => import("@/ui/pages/admin/admin.account.page"))
);
const AdminChangePasswordPage = Loadable(
	lazy(() => import("@/ui/pages/admin/admin.change-password.page"))
);

const AdminRoutes: RouteObject[] = [
	{
		path: "/admin",
		element: (
			<RBACRoutes allowedRoles={[Roles.ADMIN]}>
				<MemoizedAdminLayout></MemoizedAdminLayout>
			</RBACRoutes>
		),
		children: [
			{
				path: "",
				element: <Navigate to="./dashboard"></Navigate>,
			},
			{
				path: "dashboard",
				element: <AdminDashboardPage />,
			},
			{
				path: "change-password",
				element: <AdminChangePasswordPage />,
			},
			{
				path: "account",
				element: <AdminAccountManagementPage />,
			},
			{
				path: "recipe",
				element: <AdminRecipePage />,
			},
			{
				path: "report",
				element: <AdminReportPage />,
			},
			{
				path: "transaction",
				element: <AdminTransactionPage />,
			},
			{
				path: "booking",
				element: <AdminBookingPage />,
			},
			{
				path: "request",
				element: <AdminRequestPage />,
			},
		],
	},
];

export default AdminRoutes;

import RBACRoutes from "@/HOCs/RBACRoutes";
import { Roles } from "@/types/user";
import { Loadable } from "@/ui/components/Loadable";
import { ProfileLayout } from "@/ui/pages/profiles/profile.layout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import loadable components
const ProfilePage = Loadable(lazy(() => import("@/ui/pages/profiles/profile.page")));
const ChangePasswordPage = Loadable(lazy(() => import("@/ui/pages/change.password.page")));
const CreatedReportsPage = Loadable(lazy(() => import("@/ui/pages/view.created.reports.page")));
const UserRoutes: RouteObject[] = [
	{
		path: "/profile",
		element: (
			<RBACRoutes allowedRoles={[Roles.USER, Roles.ADMIN, Roles.CHEF]}>
				<ProfileLayout></ProfileLayout>
			</RBACRoutes>
		),
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
						<CreatedReportsPage></CreatedReportsPage>
					</RBACRoutes>
				),
			},
		],
	},
];

export default UserRoutes;

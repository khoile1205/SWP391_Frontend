import React, { useCallback, useMemo } from "react";
import { Tabs } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Roles } from "@/types/user";
import userStore from "@/zustand/user.store";

const { TabPane } = Tabs;

const profileTabs = [
	{
		tab: "Profile",
		key: "",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Recipes",
		key: "recipes",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Change Password",
		key: "change-password",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Reports",
		key: "reports",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Transaction",
		key: "transactions",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Booking",
		key: "bookings",
		role: [Roles.USER],
	},
	{
		tab: "Become-Chef Request",
		key: "requests",
		role: [Roles.USER],
	},
	{
		tab: "Schedules",
		key: "schedules",
		role: [Roles.CHEF],
	},
];

const ProfileLayout: React.FC = () => {
	const { user } = userStore((state) => state);
	const navigate = useNavigate();
	const location = useLocation();

	const currentTab = location.pathname.split("/")[2];

	// Handle tab change
	const handleChange = useCallback(
		(key: string) => {
			navigate(`/profile/${key}`);
		},
		[navigate]
	);

	const filteredTabs = useMemo(
		() => profileTabs.filter((tab) => tab.role.includes(user?.role ?? Roles.USER)),
		[user?.role]
	);

	return (
		<Tabs activeKey={currentTab} onChange={handleChange}>
			{filteredTabs.map((tab) => (
				<TabPane tab={tab.tab} key={tab.key}>
					<Outlet></Outlet>
				</TabPane>
			))}
		</Tabs>
	);
};

export const MemoizedProfileLayout = React.memo(ProfileLayout);

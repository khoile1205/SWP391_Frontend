import React, { useCallback, useMemo } from "react";
import { Tabs } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import userStore from "@/zustand/user.store";
import { Roles } from "@/enums";

const { TabPane } = Tabs;

const profileTabs = [
	{
		tab: "Profile",
		key: "",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Change Password",
		key: "change-password",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Wallet",
		key: "wallet",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Recipes",
		key: "recipes",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Favourite Recipes",
		key: "favourite-recipes",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Reports",
		key: "reports",
		role: [Roles.USER, Roles.CHEF],
	},
	{
		tab: "Transaction History",
		key: "transactions",
		role: [Roles.USER, Roles.CHEF],
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
	{
		tab: "Booking History",
		key: "bookings",
		role: [Roles.USER],
	},
];

const ProfileLayout: React.FC = () => {
	const { user } = userStore((state) => state);
	const navigate = useNavigate();
	const location = useLocation();

	const currentTab = location.pathname.split("/")[2];

	React.useEffect(() => {
		const title = profileTabs.find((tab) => tab.key === currentTab)?.tab;
		document.title = `${title} - Nest Cooking`;
	}, [currentTab]);

	// Handle tab change
	const handleChange = useCallback(
		(key: string) => {
			navigate(`/profile/${key}`);
		},
		[navigate]
	);

	// Filter tabs based on user role
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

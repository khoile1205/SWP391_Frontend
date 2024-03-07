import { Tabs } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import React from "react";

const { TabPane } = Tabs;

const adminTabs = [
	{
		tab: "Dashboard",
		key: "dashboard",
	},
	{
		tab: "Recipes Management",
		key: "recipe",
	},
	{
		tab: "Reports Management",
		key: "report",
	},
	{
		tab: "Transaction History Management",
		key: "transaction",
	},
	// {
	// 	tab: "Booking",
	// 	key: "booking",
	// },
	{
		tab: "Become-Chef Request",
		key: "request",
	},
];

const AdminLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentTab = location.pathname.split("/")[2];

	// Handle tab change
	const handleChange = useCallback(
		(key: string) => {
			navigate(`/admin/${key}`);
		},
		[navigate]
	);

	return (
		<Tabs activeKey={currentTab} onChange={handleChange}>
			{adminTabs.map((tab) => (
				<TabPane tab={tab.tab} key={tab.key}>
					<Outlet></Outlet>
				</TabPane>
			))}
		</Tabs>
	);
};

export const MemoizedAdminLayout = React.memo(AdminLayout);

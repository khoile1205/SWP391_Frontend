import React from "react";
import { Tabs } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

export const ProfileLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentTab = location.pathname.split("/").pop();

	// Handle tab change
	const handleChange = (key: string) => {
		navigate(`/profile/${key}`);
	};

	return (
		<Tabs activeKey={currentTab} onChange={handleChange}>
			<TabPane tab="Profile" key="">
				<Outlet />
			</TabPane>
			<TabPane tab="Change Password" key="change-password">
				<Outlet />
				{/* Your ChangePasswordPage component goes here */}
			</TabPane>
			<TabPane tab="View Report" key="reports">
				<Outlet />
				{/* Your ViewReportPage component goes here */}
			</TabPane>
		</Tabs>
	);
};

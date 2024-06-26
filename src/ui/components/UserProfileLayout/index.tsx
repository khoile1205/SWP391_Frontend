// UserProfileLayout.js
import React, { useState } from "react";
import { Avatar, Button, Flex, Tooltip, Typography, Divider } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import { Roles } from "@/enums";
import { useGetUserConnections } from "@/hooks/user";
import userStore from "@/zustand/user.store";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { reportStore } from "@/zustand/report.store";

interface UserProfileLayoutProps {
	user: User;
}

export const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ user }) => {
	// Zustand state
	const { setReportModalState } = reportStore((state) => state);
	const { user: currentUser, unfollowUser, followUser, updateUser } = userStore((state) => state);

	// Hooks
	const { count: numberOfFollower, setCount: setNumberOfFollower } = useGetUserConnections(
		user.id,
		"follower"
	);
	const { count: numberOfFollowing } = useGetUserConnections(user.id, "following");
	const navigate = useNavigate();

	// Local states
	const [isFollower, setIsFollower] = useState<boolean>(
		currentUser?.followings.some((follower) => follower.id === user.id) || false
	);

	// Handle event
	const handleReportClick = () => {
		setReportModalState({ targetId: user.id, type: "user", open: true });
	};

	// Controller
	const handleFollowUser = async () => {
		if (!currentUser) {
			showToast("error", AppString.authorizeRequiredErrorMessage);
			navigate("/sign-in");
			return;
		}

		const result = isFollower ? await unfollowUser(user.id) : await followUser(user.id);
		showToast(!result.isSuccess ? "error" : "success", result.message!);

		if (user.id != currentUser.id) {
			setIsFollower(!isFollower);
			setNumberOfFollower(isFollower ? numberOfFollower - 1 : numberOfFollower + 1);
		} else {
			const newFollowings = isFollower
				? currentUser.followings.filter((following) => following.id !== user.id)
				: currentUser.followings.concat(user);
			updateUser({ ...currentUser, followings: newFollowings });
			setIsFollower(!isFollower);
		}
	};

	return (
		<>
			<Flex justify="space-between" align="center">
				<Flex align="end" className="space-x-4">
					<Avatar size={100} src={user.avatarUrl} />
					<div className="space-y-2">
						<Flex className="space-x-4">
							<Typography.Title level={3} className="!mb-0">
								{`${user.firstName} ${user.lastName}`}
							</Typography.Title>
							{user.role === Roles.CHEF && (
								<Tooltip title="This is the chef">
									<CheckCircleOutlined className="text-primary" />
								</Tooltip>
							)}
							{user.id != currentUser?.id && (
								<Button
									className={`${!isFollower ? "bg-primary text-white" : ""}`}
									onClick={handleFollowUser}
								>
									{!isFollower ? "Follow" : "Unfollow"}
								</Button>
							)}
						</Flex>
						<div className="inline-block space-x-7">
							<Typography.Link href={`/user/${user.id}/follower`} className="!text-gray-600">
								{user.id == currentUser?.id ? currentUser?.followers.length : numberOfFollower}{" "}
								Follower
							</Typography.Link>
							<Typography.Link href={`/user/${user.id}/following`} className="!text-gray-600">
								{user.id == currentUser?.id ? currentUser?.followings.length : numberOfFollowing}{" "}
								Following
							</Typography.Link>
						</div>
					</div>
				</Flex>
				{currentUser && currentUser.id !== user.id && (
					<Tooltip title="Report" className="flex items-center">
						<Button
							type="text"
							icon={<WarningOutlined className="!text-xl" />}
							onClick={handleReportClick}
						>
							<Typography>Report</Typography>
						</Button>
					</Tooltip>
				)}
			</Flex>

			<Divider />
		</>
	);
};

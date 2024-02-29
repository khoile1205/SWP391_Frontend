// UserProfileLayout.js
import React, { useState } from "react";
import { Avatar, Button, Flex, Tooltip, Typography, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import { Roles } from "@/enums";
import { useGetUserConnections } from "@/hooks/user";
import userStore from "@/zustand/user.store";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";

interface UserProfileLayoutProps {
	user: User;
}

export const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ user }) => {
	const { user: currentUser, unfollowUser, followUser, updateUser } = userStore((state) => state);
	const navigate = useNavigate();

	const [isFollower, setIsFollower] = useState<boolean>(
		currentUser?.followings.some((follower) => follower.id === user.id) || false
	);

	const handleFollowUser = async () => {
		if (!currentUser) {
			showToast("error", AppString.accessDenied);
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

	const { count: numberOfFollower, setCount: setNumberOfFollower } = useGetUserConnections(
		user.id,
		"follower"
	);
	const { count: numberOfFollowing } = useGetUserConnections(user.id, "following");

	return (
		<>
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
			<Divider />
		</>
	);
};

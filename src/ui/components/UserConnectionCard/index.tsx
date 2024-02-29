import { Roles } from "@/enums";
import { User } from "@/models/user.model";
import AppString from "@/utils/app-string";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Flex, Avatar, Typography, Tooltip, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserConnectionCardProps {
	userConnection: User;
}

export const UserConnectionCard: React.FC<UserConnectionCardProps> = ({ userConnection }) => {
	const { user, unfollowUser, followUser, updateUser } = userStore((state) => state);
	const navigate = useNavigate();

	const [isFollower, setIsFollower] = useState<boolean>(
		user?.followings.some((follower) => follower.id == userConnection.id) || false
	);

	const handleFollowUser = async () => {
		if (!user) {
			showToast("error", AppString.authorizeRequiredErrorMessage);
			navigate("/sign-in");
			return;
		}

		const result = isFollower
			? await unfollowUser(userConnection.id)
			: await followUser(userConnection.id);
		showToast(!result.isSuccess ? "error" : "success", result.message!);

		const newFollowings = isFollower
			? user.followings.filter((following) => following.id !== userConnection.id)
			: user.followings.concat(userConnection);
		updateUser({ ...user, followings: newFollowings });

		setIsFollower(!isFollower);
	};
	return (
		<Flex align="center" className="space-x-4">
			<a href={`/user/${userConnection.id}`}>
				<Avatar size={{ xs: 40, lg: 64, xl: 80, xxl: 100 }} src={userConnection.avatarUrl} />
			</a>
			<Flex className="space-x-4" align="center">
				<a href={`/user/${userConnection.id}`}>
					<Typography.Title
						level={3}
						className="!lg:text-xl !xl:text-2xl !2xl:text-3xl !mb-0 !text-lg"
					>
						{`${userConnection.firstName} ${userConnection.lastName}`}
					</Typography.Title>
				</a>
				{userConnection.role === Roles.USER && (
					<Tooltip title="This is the chef">
						<CheckCircleOutlined className="text-primary" />
					</Tooltip>
				)}
				{user?.id != userConnection?.id && (
					<Button
						className={`${!isFollower ? "bg-primary text-white" : ""}`}
						onClick={handleFollowUser}
					>
						{!isFollower ? "Follow" : "Unfollow"}
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

import { Roles } from "@/enums";
import { User } from "@/models/user.model";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Flex, Avatar, Typography, Tooltip } from "antd";
import React from "react";

interface UserCardProps {
	user: User;
}
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
	return (
		<Flex align="center" className="space-x-4">
			<a href={`/user/${user.id}`}>
				<Avatar size={{ xs: 40, lg: 64, xl: 80, xxl: 100 }} src={user.avatarUrl} />
			</a>
			<Flex className="space-x-4" align="center">
				<a href={`/user/${user.id}`}>
					<Typography.Title
						level={3}
						className="!lg:text-xl !xl:text-2xl !2xl:text-3xl !mb-0 !text-lg"
					>
						{`${user.firstName} ${user.lastName}`}
					</Typography.Title>
				</a>
				{user.role === Roles.USER && (
					<Tooltip title="This is the chef">
						<CheckCircleOutlined className="text-primary" />
					</Tooltip>
				)}
			</Flex>
		</Flex>
	);
};

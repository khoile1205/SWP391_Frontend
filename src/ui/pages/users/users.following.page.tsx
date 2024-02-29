import { useGetUserById, useGetUserConnections } from "@/hooks/user";
import { useParams } from "react-router-dom";
import NotFound from "../not-found.page";
import { UserProfileLayout } from "@/ui/components";
import { ListUserConnection } from "@/ui/section";
import { SearchOutlined } from "@ant-design/icons";
import { Flex, Typography, Input, Divider } from "antd";
import { useEffect, useState } from "react";
import { User } from "@/models/user.model";

export default function UserFollowingPage() {
	const { userId } = useParams();

	const { user } = useGetUserById(userId);

	const { data: listUserFollowing } = useGetUserConnections(userId, "following");

	const [listUser, setListUser] = useState<User[]>([]);

	useEffect(() => {
		if (listUserFollowing.length > 0) setListUser(listUserFollowing);
	}, [listUserFollowing]);

	const handleSearchFollowing = (value: string) => {
		if (!value) {
			setListUser(listUserFollowing);
			return;
		}
		const updatedFollowing = listUserFollowing.filter((user) => {
			return (user.firstName + " " + user.lastName).toLowerCase().includes(value.toLowerCase());
		});
		setListUser(updatedFollowing);
	};
	return user ? (
		<div>
			<UserProfileLayout user={user} />
			<Flex align="center" justify="space-between">
				<Typography.Title level={3} className="!m-0">
					Following
				</Typography.Title>
				<Flex align="center">
					<Input
						prefix={<SearchOutlined></SearchOutlined>}
						placeholder="Search Following ..."
						className="rounded-lg"
						onChange={(e) => handleSearchFollowing(e.target.value)}
					></Input>
				</Flex>
			</Flex>
			<Divider></Divider>
			<ListUserConnection listUsers={listUser}></ListUserConnection>
		</div>
	) : (
		<NotFound></NotFound>
	);
}

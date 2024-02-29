import { useGetUserById, useGetUserConnections } from "@/hooks/user";
import { useParams } from "react-router-dom";
import NotFound from "../not-found.page";
import { UserProfileLayout } from "@/ui/components";
import { Divider, Flex, Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ListUserConnection } from "@/ui/section";
// import _ from "lodash";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";

export default function UserFollowerPage() {
	// Fetch API
	const { userId } = useParams();
	const { data: listUserFollower } = useGetUserConnections(userId, "follower");
	const { user } = useGetUserById(userId);

	const [listUser, setListUser] = useState<User[]>(listUserFollower);

	// Hooks
	useEffect(() => {
		if (listUserFollower.length > 0) setListUser(listUserFollower);
	}, [listUserFollower]);

	// Controller
	const handleSearchFollower = (value: string) => {
		if (!value) {
			setListUser(listUserFollower);
			return;
		}
		const updatedFollower = listUserFollower.filter((user) => {
			return (user.firstName + " " + user.lastName).toLowerCase().includes(value.toLowerCase());
		});
		setListUser(updatedFollower);
	};
	return user ? (
		<div>
			<UserProfileLayout user={user} />
			<Flex align="center" justify="space-between">
				<Typography.Title level={3} className="!m-0">
					Follower
				</Typography.Title>
				<Flex align="center">
					<Input
						prefix={<SearchOutlined></SearchOutlined>}
						placeholder="Search Follower"
						className="rounded-lg"
						onChange={(e) => handleSearchFollower(e.target.value)}
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

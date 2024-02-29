import { useParams } from "react-router-dom";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import Loadmore from "@/ui/components/Loadmore";
import { useState } from "react";
import { useGetUserById } from "@/hooks/user";
import { useGetRecipesByUserId } from "@/hooks/recipes";
import { RecipeListSection } from "@/ui/section";
import NotFound from "../not-found.page";
import { Roles } from "@/enums";
import { showToast } from "@/utils/notify";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Flex, Avatar, Typography, Tooltip, Button, Divider, Space } from "antd";

type Filter = {
	type: "newest" | "oldest";
	description: "Newest" | "Oldest";
};

export default function UserProfilePage() {
	const { userId } = useParams();
	const [isFollower, setIsFollower] = useState(false);
	const [filter, setFilter] = useState<Filter>({
		description: "Newest",
		type: "newest",
	});
	const { visibleRecipes, handleLoadMore, hasMore } = useGetRecipesByUserId(userId, filter.type);

	const { user } = useGetUserById(userId);

	const handleFilter = () => {
		setFilter((prevFilter) =>
			prevFilter.type === "newest"
				? { type: "oldest", description: "Oldest" }
				: { type: "newest", description: "Newest" }
		);
	};

	const handleFollowUser = () => {
		setIsFollower(!isFollower);
		showToast("success", !isFollower ? "Follow user successfully" : "Unfollow user successfully");
	};
	return user ? (
		<>
			<Flex align="end" className="space-x-4">
				<Avatar size={100} src={user.avatarUrl} />
				<div className="space-y-2">
					<Flex className="space-x-4">
						<Typography.Title level={3} className="!mb-0">
							{user.firstName + " " + user.lastName}
						</Typography.Title>
						{user.role == Roles.CHEF && (
							<Tooltip title="This is the chef">
								<CheckCircleOutlined className="text-primary" />
							</Tooltip>
						)}
						<Button
							className={`${!isFollower ? "bg-primary text-white" : ""}`}
							onClick={handleFollowUser}
						>
							{!isFollower ? "Follow" : "Unfollow"}
						</Button>
					</Flex>
					<div className="inline-block space-x-7">
						<Typography.Link href="/" className="!text-gray-600">
							10 Follower
						</Typography.Link>
						<Typography.Link href="/" className="!text-gray-600">
							10 Following
						</Typography.Link>
					</div>
				</div>
			</Flex>
			<Divider></Divider>
			<Flex align="center" justify="space-between">
				<Typography.Title level={3} className="!m-0">
					Recipes
				</Typography.Title>
				<Flex align="center">
					<div onClick={handleFilter} className="hover:cursor-pointer">
						{filter.type == "newest" ? (
							<GoSortAsc className="me-2 h-6 w-6"></GoSortAsc>
						) : (
							<GoSortDesc className="me-2 h-6 w-6"></GoSortDesc>
						)}
					</div>
					<Typography>{filter.description}</Typography>
				</Flex>
			</Flex>
			<Divider></Divider>
			<Space direction="vertical" size={"middle"} className="w-full">
				<RecipeListSection listRecipes={visibleRecipes}></RecipeListSection>
			</Space>
			{hasMore && (
				<Loadmore
					onClick={handleLoadMore}
					title="Load more Recipes"
					className="text-center"
				></Loadmore>
			)}
		</>
	) : (
		<NotFound></NotFound>
	);
}

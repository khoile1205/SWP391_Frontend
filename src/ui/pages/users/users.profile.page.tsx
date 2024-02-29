import { RecipeCard } from "@/ui/components";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import Loadmore from "@/ui/components/Loadmore";
import { useState } from "react";
import Link from "antd/es/typography/Link";
import { useGetUserById } from "@/hooks/user";
import { useGetRecipesByUserId } from "@/hooks/recipes";

type Filter = {
	type: "newest" | "oldest";
	description: "Newest" | "Oldest";
};

export default function UserProfilePage() {
	const { userId } = useParams();

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
	console.log(user);
	return (
		<>
			<Flex align="end" className="space-x-4">
				<Avatar
					// size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
					size={100}
					icon={<AntDesignOutlined />}
				/>
				<div className="space-y-1">
					<Typography.Title level={3} className="!mb-0">
						User Profile Page
					</Typography.Title>
					<div className="inline space-x-3">
						<Typography.Text>
							<Link href="/">10 Follower</Link>
						</Typography.Text>
						<Typography.Text>
							<Link href="/">10 Following</Link>
						</Typography.Text>
					</div>
					<Button className="bg-primary text-white"> Follow</Button>
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
				{visibleRecipes.map((recipe) => (
					<RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
				))}
			</Space>
			{/* <div className="text-center"> */}
			{hasMore && (
				<Loadmore
					onClick={handleLoadMore}
					title="Load more Recipes"
					className="text-center"
				></Loadmore>
			)}
			{/* </div> */}
		</>
	);
}

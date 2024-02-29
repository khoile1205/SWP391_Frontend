import { useParams } from "react-router-dom";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import Loadmore from "@/ui/components/Loadmore";
import { useState } from "react";
import { useGetUserById } from "@/hooks/user";
import { useGetRecipesByUserId } from "@/hooks/recipes";
import { RecipeListSection } from "@/ui/section";
import NotFound from "../not-found.page";
import { UserProfileLayout } from "@/ui/components";
import { Divider, Flex, Typography, Space } from "antd";

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

	return user ? (
		<>
			<UserProfileLayout user={user} />
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

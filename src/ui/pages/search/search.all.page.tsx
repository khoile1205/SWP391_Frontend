import { useGetSearchResult } from "@/hooks/search";
import { ListUser, RecipeListSection } from "@/ui/section";
import { Flex, Space, Typography } from "antd";

export default function SearchAllPage() {
	//  Get query
	const { type, result, searchKeyword } = useGetSearchResult();

	return (
		<>
			<Typography.Title className="font-playfair">
				Search result for {searchKeyword}
			</Typography.Title>
			<Space className="w-full" size={"middle"} direction="vertical">
				{(type === "all" || type == "recipes") && (
					<>
						<Flex justify="space-between" align="center">
							<Typography.Title className="font-playfair" level={3} rootClassName="!mb-0">
								For Recipe:{" "}
							</Typography.Title>
							{type === "all" && result.recipes.length > 0 && (
								<Typography.Link
									href={`/search/recipes?q=${searchKeyword}`}
									className="!text-primary hover:!text-gray-500"
								>
									See all recipes
								</Typography.Link>
							)}
						</Flex>
						<RecipeListSection listRecipes={result.recipes}></RecipeListSection>
					</>
				)}
				{(type === "all" || type == "users") && (
					<>
						<Flex justify="space-between" align="center">
							<Typography.Title className="font-playfair" level={3}>
								For User:{" "}
							</Typography.Title>
							{type == "all" && result.users.length > 0 && (
								<Typography.Link
									href={`/search/users?q=${searchKeyword}`}
									className="!text-primary hover:!text-gray-500"
								>
									See all users
								</Typography.Link>
							)}
						</Flex>

						<ListUser listUsers={result.users}></ListUser>
					</>
				)}
			</Space>
		</>
	);
}

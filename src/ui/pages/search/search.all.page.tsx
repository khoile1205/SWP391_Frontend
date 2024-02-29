import { useGetSearchResult } from "@/hooks/search";
import { RecipeCard } from "@/ui/components";
import { Typography } from "antd";

export default function SearchAllPage() {
	//  Get query
	const { type, result, searchKeyword } = useGetSearchResult();

	return (
		<>
			<Typography.Title className="font-playfair">
				Search result for {searchKeyword}
			</Typography.Title>
			{(type === "all" || type == "recipes") && (
				<>
					<Typography.Title className="font-playfair" level={3}>
						For Recipe:{" "}
					</Typography.Title>

					<div className="md:grid md:grid-cols-3 md:gap-4">
						{result.recipes.map((recipe) => (
							<RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
						))}
					</div>
				</>
			)}
			{/* {(type === "all" || type == "users") && (
				<>
					<div>{pickRandomElements(result.users, 3).map((user) => user.id)}</div>
				</>
			)} */}
		</>
	);
}

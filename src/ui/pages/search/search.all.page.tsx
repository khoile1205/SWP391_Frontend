import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import { RecipeCard } from "@/ui/components";
import { pickRandomElements } from "@/utils/array_exts";
import { Typography } from "antd";

export default function SearchAllPage() {
	//  Get query
	const { type, result, searchKeyword } = useGetSearchResult();

	return (
		<>
			<Typography.Title>Search Result</Typography.Title>
			<Typography.Text>Search for: {searchKeyword}</Typography.Text>
			{(type === "all" || type == "recipes") && (
				<>
					{pickRandomElements(result.recipes, 8).map((recipe) => (
						<RecipeCard recipe={recipe}></RecipeCard>
					))}
				</>
			)}
			{(type === "all" || type == "users") && (
				<>
					<div>{pickRandomElements(result.users, 3).map((user) => user.id)}</div>
				</>
			)}
		</>
	);
}

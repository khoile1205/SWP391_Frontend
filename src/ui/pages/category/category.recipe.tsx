import { useGetRecipeByCategoryId } from "@/hooks/useGetRecipeByCategoryId";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import NotFound from "../not-found.page";
import { RecipeCard } from "@/ui/components";

export default function RecipeCategoryPage() {
	// Hooks
	const { categoryId } = useParams();

	const { recipes, category } = useGetRecipeByCategoryId(parseInt(categoryId!));

	return !category ? (
		<NotFound></NotFound>
	) : (
		<div>
			<Typography.Title level={2}>{category.name}</Typography.Title>
			<div className="md:grid md:grid-cols-3 md:gap-4">
				{recipes.map((recipe) => (
					<div key={recipe.id}>
						<RecipeCard recipe={recipe}></RecipeCard>
					</div>
				))}
			</div>
		</div>
	);
}

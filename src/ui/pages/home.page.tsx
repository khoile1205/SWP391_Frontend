import { Typography } from "antd";
import { useLoadingStore } from "@/zustand/loading.store";
import { CategoryCard, RecipeCard } from "../components";
import { categoriesStore } from "@/zustand/category.store";
import { useGetAllRecipes } from "@/hooks/useGetAllRecipes";
import { pickRandomElements } from "@/utils/array_exts";

export function HomePage() {
	const { categories } = categoriesStore((state) => state);
	const { isLoading } = useLoadingStore((state) => state);
	const { recipes } = useGetAllRecipes();
	return (
		<div className="mt-10">
			<div className="">
				<Typography.Title level={2}>Special Recipes</Typography.Title>
				<div className="md:grid md:grid-cols-3 md:gap-4">
					{pickRandomElements(recipes, 3).map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			</div>

			{/* {pickRandomElements(categories, 3).map((category) => (
				<div className="mt-3">
					<Typography.Title level={2} className="capitalize">
						With {category.name}
					</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{RECIPES.slice(3, 6).map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
			))} */}

			<div className="mt-3">
				<Typography.Title level={2} className="mb-3">
					Popular Categories
				</Typography.Title>
				<div className="grid grid-cols-3 justify-between space-x-3 text-center md:grid-cols-6">
					{categories.slice(0, 6).map((category) => (
						<CategoryCard key={category.id} category={category} isLoading={isLoading} />
					))}
				</div>
			</div>
		</div>
	);
}

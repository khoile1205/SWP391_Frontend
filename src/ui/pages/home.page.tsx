import { Typography } from "antd";
import { CategoryCard, RecipeCard } from "../components";
import { categoriesStore } from "@/zustand/category.store";
import { pickRandomElements } from "@/utils/array_exts";
import HeroSection from "@/assets/images/HeroSection.svg";
import { useGetAllRecipes } from "@/hooks/recipes";
export function HomePage() {
	const { categories } = categoriesStore((state) => state);
	const { recipes } = useGetAllRecipes();
	return (
		<>
			<div className="text-center ">
				<img src={HeroSection} className="w-full" />
			</div>
			<div className="mt-10 space-y-10">
				<div className="">
					<Typography.Title className="font-playfair">Special Recipes</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{pickRandomElements(recipes, 3).map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>

				<div className="">
					<Typography.Title className="font-playfair">Newest Recipes</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{recipes
							.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
							.slice(0, 3)
							.map((recipe) => (
								<RecipeCard key={recipe.id} recipe={recipe} />
							))}
					</div>
				</div>

				<div className="">
					<Typography.Title className="font-playfair capitalize">
						{" "}
						Maybe you like it
					</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{pickRandomElements(recipes, 3).map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
				<div className="mt-3">
					<Typography.Title className="mb-3 font-playfair capitalize">
						Popular Categories
					</Typography.Title>
					<div className="grid grid-cols-3 justify-between space-x-3 text-center md:grid-cols-6">
						{pickRandomElements(categories, 6).map((category) => (
							<CategoryCard key={category.id} category={category} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

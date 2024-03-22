import { Flex, Typography } from "antd";
import { CarouselComponent, CategoryCard, RecipeCard } from "../components";
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
					<CarouselComponent
						items={pickRandomElements(recipes, recipes.length)}
						renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
					/>
				</div>

				<div className="">
					<Typography.Title className="font-playfair">Newest Recipes</Typography.Title>
					<CarouselComponent
						items={recipes.sort(
							(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						)}
						renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
					/>
				</div>

				<div className="">
					<Typography.Title className="font-playfair capitalize">
						{" "}
						Maybe you like it
					</Typography.Title>
					<CarouselComponent
						items={pickRandomElements(recipes, recipes.length)}
						renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
					/>
				</div>
				<div className="mt-3">
					<Flex align="center" justify="space-between">
						<Typography.Title className="mb-3 font-playfair capitalize">
							Popular Categories
						</Typography.Title>
						<Typography.Link
							href={`/category`}
							className="!text-primary mb-3 font-playfair text-lg capitalize"
						>
							See more
						</Typography.Link>
					</Flex>
					<div className="text-center">
						<CarouselComponent
							items={categories}
							renderItem={(category) => <CategoryCard key={category.id} category={category} />}
							responsiveItems={{
								desktopItems: 6,
								tabletItems: 4,
								mobileItems: 2,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

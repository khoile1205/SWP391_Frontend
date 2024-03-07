import { useGetAllRecipes, useGetAllRecipesWtihCategory } from "@/hooks/recipes";
import { CarouselComponent, RecipeCard } from "@/ui/components";
import AppString from "@/utils/app-string";
import AppColor from "@/utils/appColor";
import { pickRandomElements } from "@/utils/array_exts";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesPage() {
	const { user } = userStore((state) => state);

	const { recipes } = useGetAllRecipes();
	const { data: recipesByCategory } = useGetAllRecipesWtihCategory();
	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const navigate = useNavigate();

	const handleRedirectCreateRecipe = () => {
		if (user) {
			navigate("/recipes/create");
		} else {
			showToast("error", AppString.authorizeRequiredErrorMessage);
			navigate("/sign-in");
		}
	};

	return (
		<div className="mx-auto">
			<div className="space-y-4 text-center">
				<Typography.Title className="font-playfair">Recipes</Typography.Title>
				<Input
					prefix={<SearchOutlined></SearchOutlined>}
					className={"w-4/5 sm:w-2/5"}
					onChange={(e) => setSearchKeyword(e.target.value)}
					suffix={
						<Button
							style={{
								backgroundColor: AppColor.deepOrangeColor,
							}}
							className=" !text-white"
							href={`/search/recipes?q=${searchKeyword}`}
						>
							Find
						</Button>
					}
					placeholder="Your recipes"
				></Input>
				<Typography
					className="text-primary text-lg hover:cursor-pointer"
					onClick={() => handleRedirectCreateRecipe()}
				>
					Create your own recipe
				</Typography>
			</div>
			<div className="space-y-10">
				<div className="">
					<Typography.Title level={2} className="font-playfair">
						Special Recipes
					</Typography.Title>
					<CarouselComponent
						items={pickRandomElements(recipes, recipes.length)}
						renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
					/>
				</div>
				<div className="">
					<Typography.Title level={2} className="font-playfair capitalize">
						{" "}
						Maybe you like it
					</Typography.Title>
					<CarouselComponent
						items={recipes}
						renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
					/>
				</div>
				{recipesByCategory &&
					recipesByCategory.length > 0 &&
					recipesByCategory.map((data) => (
						<div className="" key={data.category.id}>
							<Flex align="center" className="space-x-3">
								<Typography.Title level={2} className="!m-0 font-playfair">
									For {data.category.name}
								</Typography.Title>
								{data.recipes.length > 3 && (
									<Typography.Link className="!text-primary" href={`/category/${data.category.id}`}>
										See more
									</Typography.Link>
								)}
							</Flex>
							<CarouselComponent
								items={data.recipes}
								className=""
								renderItem={(recipe) => <RecipeCard key={recipe.id} recipe={recipe} />}
							/>
						</div>
					))}
			</div>
		</div>
	);
}

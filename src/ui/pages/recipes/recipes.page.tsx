import { useGetAllRecipes } from "@/hooks/useGetAllRecipes";
import { RecipeCard } from "@/ui/components";
import AppString from "@/utils/app-string";
import AppColor from "@/utils/appColor";
import { pickRandomElements } from "@/utils/array_exts";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesPage() {
	const { user } = userStore((state) => state);

	const { recipes } = useGetAllRecipes();
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

	const specialRecipes = useMemo(() => pickRandomElements(recipes, 3), [recipes]);
	const maybeLikeItRecipes = useMemo(() => pickRandomElements(recipes, 3), [recipes]);
	const superDeliciousRecipes = useMemo(() => pickRandomElements(recipes, 3), [recipes]);

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
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{specialRecipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
				<div className="">
					<Typography.Title level={2} className="font-playfair capitalize">
						{" "}
						Maybe you like it
					</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{maybeLikeItRecipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
				<div className="">
					<Typography.Title level={2} className="font-playfair capitalize">
						{" "}
						Super Delicious
					</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{superDeliciousRecipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

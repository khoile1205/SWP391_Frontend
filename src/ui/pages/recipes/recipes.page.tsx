import { useGetAllRecipes } from "@/hooks/useGetAllRecipes";
import { RecipeCard } from "@/ui/components";
import AppColor from "@/utils/appColor";
import { pickRandomElements } from "@/utils/array_exts";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import Link from "antd/es/typography/Link";

export default function RecipesPage() {
	const { recipes } = useGetAllRecipes();

	return (
		<div className="mx-auto">
			<div className="space-y-4 text-center">
				<div>Recipes</div>
				<Input
					prefix={<SearchOutlined></SearchOutlined>}
					className={"w-4/5 sm:w-2/5"}
					suffix={
						<Button
							style={{
								backgroundColor: AppColor.deepOrangeColor,
							}}
							className=" !text-white"
						>
							<a href="/recipes/1">Find</a>
						</Button>
					}
					placeholder="Your recipes"
				></Input>
				<Typography>
					<Link
						href="/recipes/create"
						style={{
							color: AppColor.deepOrangeColor,
						}}
					>
						Create your own recipe
					</Link>
				</Typography>
			</div>
			<div className="space-y-4">
				<div className="">
					<Typography.Title level={2}>Special Recipes</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{pickRandomElements(recipes, 3).map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
				<div className="">
					<Typography.Title level={2}>Special Recipes</Typography.Title>
					<div className="md:grid md:grid-cols-3 md:gap-4">
						{pickRandomElements(recipes, 3).map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

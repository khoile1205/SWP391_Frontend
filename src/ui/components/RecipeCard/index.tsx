import { Typography, Card, Menu, Dropdown, Avatar, Rate, Tooltip } from "antd";
import { Recipe } from "@/models/recipe.model";
import { HeartOutlined, ShareAltOutlined, StarOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { SocialShareButton } from "..";
import AppColor from "@/utils/appColor";
import { recipeStore } from "@/zustand/recipe.store";
import { useNavigate } from "react-router-dom";
import userStore from "@/zustand/user.store";
import { showToast } from "@/utils/notify";
import { useRecipeBookmark } from "@/hooks/recipes";
import { useAuthenticateFeature } from "@/hooks/common";
import { useEffect, useState } from "react";
import { Reactions } from "@/enums/reaction.enum";
import { reactionStore } from "@/zustand/reaction.store";

interface RecipeCardProps {
	recipe: Recipe;
}

interface ShareMenuProps {
	recipeId: string;
}
const ShareMenu: React.FC<ShareMenuProps> = ({ recipeId }) => (
	<Menu>
		<Menu.Item>
			<SocialShareButton
				platform={"Facebook"}
				url={`${import.meta.env.VITE_URL}/recipes/${recipeId}`}
			></SocialShareButton>
		</Menu.Item>
		<Menu.Item>
			<SocialShareButton
				platform={"Twitter"}
				url={`${import.meta.env.VITE_URL}/recipes/${recipeId}`}
			></SocialShareButton>
		</Menu.Item>
	</Menu>
);

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const [isReacted, setIsReacted] = useState<boolean>(false);

	// Zustand store
	const { saveFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);
	const { user, userRecipeReaction } = userStore((state) => state);
	const { removeReaction, postReaction } = reactionStore((state) => state);

	// Hooks
	const { bookmarked, setBookmarked } = useRecipeBookmark(recipe.id);
	const navigator = useNavigate();

	useEffect(() => {
		if (userRecipeReaction && user) {
			setIsReacted(
				userRecipeReaction.favorite.includes(recipe.id) ||
					userRecipeReaction.haha.includes(recipe.id) ||
					userRecipeReaction.like.includes(recipe.id)
			);
		}
	}, [recipe.id, user, userRecipeReaction]);
	const handleClickFavourite = () => {
		if (user == null) {
			showToast("error", "Please sign in to save your favorite recipe");
			navigator("/sign-in");
			return;
		}
		if (bookmarked) {
			removeFavoriteRecipe(recipe.id);
			showToast("success", "Your recipe remove favorite successfully");
			setBookmarked(false);
		} else {
			saveFavoriteRecipe(recipe.id);
			showToast("success", "Your recipe saved favourite successfully");
			setBookmarked(true);
		}
	};
	// const handleReactRecipe = useAuthenticateFeature(async () => {
	// 	console.log(true);

	// });
	const handleReactRecipe = useAuthenticateFeature(async () => {
		let result;
		if (isReacted) {
			// If user already reacted, then remove the reaction
			result = await removeReaction({
				reaction: Reactions.favorite,
				targetID: recipe?.id as string,
				type: "recipe",
			});
		} else {
			// If user has not reacted, then add the reaction
			result = await postReaction({
				reaction: Reactions.favorite,
				targetID: recipe?.id as string,
				type: "recipe",
			});
		}

		if (result.isSuccess) {
			showToast("success", result.message!);
			setIsReacted((prev) => !prev);
		} else {
			showToast("error", result.message!);
		}
	});
	return (
		<Card
			bordered={false}
			actions={[
				<HeartOutlined
					key="react"
					onClick={handleReactRecipe}
					className={`hover:!text-primary  ${isReacted ? "!text-primary" : ""}`}
				/>,
				<StarOutlined
					key="save"
					className="hover:!text-primary text-red-500"
					style={{
						color: bookmarked ? AppColor.deepOrangeColor : "rgba(0,0,0,0.45)",
					}}
					onClick={() => {
						handleClickFavourite(), setBookmarked(!bookmarked);
					}}
				/>,
				<Dropdown
					overlay={() => <ShareMenu recipeId={recipe.id} />}
					trigger={["click"]}
					className="hover:!text-primary focus:!text-primary text-[#00000073]"
				>
					<ShareAltOutlined key="share" />
				</Dropdown>,
			]}
			cover={
				<a href={`/recipes/${recipe.id}`}>
					<img alt="example" src={recipe.thumbnailUrl} className="h-[227px] w-full" />
				</a>
			}
		>
			<Meta
				avatar={
					<Tooltip title={recipe.user.firstName + " " + recipe.user.lastName}>
						<a href={`/user/${recipe.user.id}`} className="relative z-50">
							<Avatar src={recipe.user.avatarUrl} />
						</a>
					</Tooltip>
				}
				title={
					<a href={`/recipes/${recipe.id}`}>
						<Typography.Title level={4} className="!m-0">
							{recipe.title}
						</Typography.Title>
					</a>
				}
				description={<Rate disabled value={recipe.difficult}></Rate>}
			/>
		</Card>
	);
};

import { Typography, Card, Menu, Dropdown, Avatar, Rate } from "antd";
import { Recipe } from "@/models/recipe.model";
import { HeartOutlined, ShareAltOutlined, StarOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { SocialShareButton } from "..";
import { useRecipeBookmark } from "@/hooks/useRecipeBookmark";
import AppColor from "@/utils/appColor";
import { recipeStore } from "@/zustand/recipe.store";
import { useNavigate } from "react-router-dom";
import userStore from "@/zustand/user.store";
import { showToast } from "@/utils/notify";

interface RecipeCardProps {
	recipe: Recipe;
}

const ShareMenu: React.FC = () => (
	<Menu>
		<Menu.Item>
			<SocialShareButton
				platform={"Facebook"}
				url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
			></SocialShareButton>
		</Menu.Item>
		<Menu.Item>
			<SocialShareButton
				platform={"Twitter"}
				url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
			></SocialShareButton>
		</Menu.Item>
	</Menu>
);

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const { bookmarked, setBookmarked } = useRecipeBookmark(recipe.id);
	const { saveFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);
	const { user } = userStore((state) => state);
	const navigator = useNavigate();

	const handleClickFavourite = () => {
		if (user == null) {
			showToast("error", "Please sign in to save your favorite recipe");
			navigator("/sign-in");
			return;
		}
		if (bookmarked) {
			removeFavoriteRecipe(recipe.id);
			setBookmarked(false);
		} else {
			saveFavoriteRecipe(recipe.id);
			setBookmarked(true);
		}
	};
	const handleReactRecipe = () => {
		console.log("React Recipe");
	};
	return (
		<Card
			bordered={false}
			actions={[
				<HeartOutlined key="react" onClick={handleReactRecipe} className="text-red-500" />,
				<StarOutlined
					key="save"
					style={{
						color: bookmarked ? AppColor.deepOrangeColor : "black",
					}}
					onClick={() => {
						handleClickFavourite(), setBookmarked(!bookmarked);
					}}
				/>,
				<Dropdown overlay={() => <ShareMenu />} trigger={["click"]}>
					<ShareAltOutlined key="share" />
				</Dropdown>,
			]}
			cover={
				<a href={`/recipes/${recipe.id}`}>
					<img alt="example" src={recipe.thumbnailUrl} />
				</a>
			}
		>
			<Meta
				avatar={
					<a className="relative z-50">
						<Avatar src={recipe.user.avatarUrl} />
					</a>
				}
				title={
					<a href={`/recipes/${recipe.id}`}>
						<Typography.Title level={4} className="!m-0">
							{recipe.title}
						</Typography.Title>
					</a>
				}
				description={<Rate disabled value={recipe.ratings}></Rate>}
			/>
		</Card>
	);
};

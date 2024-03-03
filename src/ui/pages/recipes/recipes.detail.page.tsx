import { useState, useCallback } from "react";
import {
	Avatar,
	Divider,
	Button,
	List,
	Tooltip,
	message,
	Rate,
	Typography,
	Flex,
	Col,
	Image,
} from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	CommentOutlined,
	CheckOutlined,
	ShareAltOutlined,
	BookOutlined,
	ClockCircleOutlined,
	TeamOutlined,
	StarOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Pasta from "@/assets/Icon/pasta.jpg";
import AppColor from "@/utils/appColor";
import { ReactionButton, ShareRecipeModal } from "@/ui/components";
import { CommentSection, RecipeListSection } from "@/ui/section";
import { useParams } from "react-router-dom";
import NotFound from "../not-found.page";
import { recipeStore } from "@/zustand/recipe.store";
import { showToast } from "@/utils/notify";
import { useGetRecipeById, useGetRelatedRecipes, useRecipeBookmark } from "@/hooks/recipes";
import { useAuthenticateFeature } from "@/hooks/common";
import { Reactions } from "@/enums/reaction.enum";
import { pickRandomElements } from "@/utils/array_exts";
import { Reaction } from "@/types/reaction";
import userStore from "@/zustand/user.store";
import { useEffectOnce } from "usehooks-ts";
import { reactionStore } from "@/zustand/reaction.store";
import { Recipe } from "@/models/recipe.model";
import { reportStore } from "@/zustand/report.store";

// Content Component - Handles the main content of the recipe
const RecipeContent: React.FC<{
	recipe: Recipe;
	bookmarked: boolean;
	handleBookmarkClick: () => void;
	setShareModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ recipe, bookmarked, handleBookmarkClick, setShareModalVisible }) => {
	const { setReportModalState } = reportStore((state) => state);
	const handleReportClick = () => {
		setReportModalState({ targetId: recipe.id, type: "recipe", open: true });
	};
	return (
		<>
			<Flex align="start" justify="space-between">
				<div className="text-start">
					<Typography.Title className={"mb-10 font-playfair !text-5xl"}>
						{recipe.title}
					</Typography.Title>
					<div className="mb-5 mr-5 mt-5 block items-center justify-start space-y-5 sm:flex sm:space-y-0">
						<Col>
							<Typography.Link href={`/user/${recipe.user.id}`}>
								<Avatar
									size={"default"}
									icon={<UserOutlined />}
									style={{ marginRight: "10px" }}
									src={recipe.user.avatarUrl}
								/>
								<Typography.Text strong className="me-5 truncate">
									{recipe.user.firstName + " " + recipe.user.lastName}
								</Typography.Text>
							</Typography.Link>
							<Divider
								className="hidden sm:inline-block"
								type="vertical"
								style={{ height: "20px", marginRight: "10px" }}
							/>
						</Col>
						<Col>
							<CalendarOutlined className={"me-2 text-xl"} />
							<Typography.Text strong className="me-5">
								{moment(recipe.createdAt).format("ll")}
							</Typography.Text>
							<Divider
								className="hidden sm:inline-block"
								type="vertical"
								style={{ height: "20px", marginRight: "10px" }}
							/>
						</Col>
						<Col>
							<CommentOutlined className={"me-2 text-xl"} />
							<Typography.Text strong className="me-5">
								{recipe.comments.total}
							</Typography.Text>
							<Divider
								className="hidden sm:inline-block"
								type="vertical"
								style={{ height: "20px", marginRight: "10px" }}
							/>
						</Col>
					</div>
				</div>
				<div className="flex flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
					<Tooltip title="Share">
						<Button
							type="text"
							icon={<ShareAltOutlined className="!text-xl" />}
							onClick={() => setShareModalVisible(true)}
						/>
					</Tooltip>
					<Tooltip title={bookmarked ? "Unbookmark" : "Bookmark"}>
						<Button
							type="text"
							icon={
								<BookOutlined
									className="!text-xl"
									style={{
										fontSize: "36px",
										color: bookmarked ? AppColor.deepOrangeColor : "#000",
									}}
								/>
							}
							onClick={handleBookmarkClick}
						/>
					</Tooltip>
					<Tooltip title="Report">
						<Button
							type="text"
							icon={<WarningOutlined className="!text-xl" />}
							onClick={handleReportClick}
						/>
					</Tooltip>
				</div>
			</Flex>
			<Typography.Paragraph className="font-inter text-lg">
				{recipe.description}
			</Typography.Paragraph>
			<img
				src={recipe.thumbnailUrl ?? Pasta}
				alt="Recipe"
				className="rounded-xl"
				style={{
					width: "100%",
					height: "auto",
					border: "none",
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			/>
			<div className="mr-5 mt-5 block items-center justify-start space-y-5 sm:flex sm:space-y-0">
				<Col>
					<ClockCircleOutlined style={{ marginRight: "10px", fontSize: "24px" }} />
					<Typography.Text strong className="me-5">
						Prep Time: {recipe.cookingTime} minutes
					</Typography.Text>
					<Divider
						className="hidden sm:inline-block"
						type="vertical"
						style={{ height: "20px", marginRight: "10px" }}
					/>
				</Col>
				<Col>
					<TeamOutlined style={{ marginRight: "10px", fontSize: "24px" }} />
					<Typography.Text strong className="me-5">
						Servings: {recipe.portion} peoples
					</Typography.Text>
					<Divider
						className="hidden sm:inline-block"
						type="vertical"
						style={{ height: "20px", marginRight: "10px" }}
					/>
				</Col>
				<Col>
					<StarOutlined style={{ marginRight: "10px", fontSize: "24px" }} />
					<Typography.Text strong className="me-5">
						Difficult:
					</Typography.Text>
					<Rate
						disabled
						allowHalf
						defaultValue={recipe.difficult}
						style={{ color: AppColor.deepOrangeColor }}
					/>
					<Divider
						className="hidden sm:inline-block"
						type="vertical"
						style={{ height: "20px", marginRight: "10px" }}
					/>
				</Col>
			</div>
		</>
	);
};

// Ingredients Component - Displays the list of ingredients
const RecipeIngredients: React.FC<{
	recipe: Recipe;
	checkedIngredients: boolean[];
	handleIngredientToggle: (index: number) => void;
}> = ({ recipe, checkedIngredients, handleIngredientToggle }) => (
	<div className="basis-2/5">
		<Typography.Title level={2} className={"mb-10 font-playfair "}>
			Ingredients
		</Typography.Title>
		<ul className="space-y-5">
			{recipe.ingredients.map((ingredient, index) => (
				<List.Item className="ms-5 flex items-center" key={index}>
					<div
						className="me-5 flex h-6 w-6 items-center justify-center rounded-full hover:cursor-pointer"
						style={{
							border: `2px solid ${checkedIngredients[index] ? AppColor.deepOrangeColor : "black"}`,
							background: checkedIngredients[index] ? "white" : "none",
						}}
						onClick={() => handleIngredientToggle(index)}
					>
						{checkedIngredients[index] && <CheckOutlined style={{ color: "orange" }} />}
					</div>
					<Typography.Text
						className={`font-inter text-lg font-medium ${checkedIngredients[index] ? "text-gray-500 line-through" : "none"}`}
					>
						{ingredient.name + " " + ingredient.amount}
					</Typography.Text>
				</List.Item>
			))}
		</ul>
	</div>
);

// Instructions Component - Displays the step-by-step instructions
const RecipeInstructions: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
	<div className="basis-3/5">
		<Typography.Title level={2} className={"mb-10 font-playfair"}>
			Instructions
		</Typography.Title>
		<ol style={{ paddingLeft: "20px", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
			{recipe.instructors.map((instructor, index) => (
				<li key={index} style={{ marginBottom: "25px" }}>
					<div>
						<Typography.Text
							className={`text-md me-3 rounded-full px-2 py-1 font-inter font-medium text-white`}
							style={{ backgroundColor: AppColor.deepOrangeColor }}
						>
							{index + 1}
						</Typography.Text>
						<Typography.Text className={`font-inter text-lg font-medium`}>
							{instructor.description}
						</Typography.Text>
					</div>
					<div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{instructor.imageUrls &&
							instructor.imageUrls.map((imageUrl, index) => (
								<div key={index} className="aspect-w-1 aspect-h-1">
									<Image
										className="h-full w-full rounded-lg object-cover"
										src={imageUrl}
										alt={`Step ${index + 1}`}
									/>
								</div>
							))}
					</div>
				</li>
			))}
		</ol>
	</div>
);

// Reactions Component - Displays reactions such as likes and favorites
const RecipeReactions: React.FC<{
	reactions: Reaction;
	isReacted: Record<keyof Reaction, boolean>;
	handleReactRecipe: (type: Reactions) => void;
}> = ({ reactions, isReacted, handleReactRecipe }) => (
	<div className=" space-x-6 md:flex md:items-center ">
		<Typography.Title level={1} className={"!mb-1 font-playfair"}>
			Reactions
		</Typography.Title>
		<ReactionButton
			reactionType={Reactions.like}
			count={reactions.like.length}
			isReacted={isReacted.like}
			onClick={() => handleReactRecipe(Reactions.like)}
		/>
		<ReactionButton
			reactionType={Reactions.favorite}
			count={reactions.favorite.length}
			isReacted={isReacted.favorite}
			onClick={() => handleReactRecipe(Reactions.favorite)}
		/>
		<ReactionButton
			reactionType={Reactions.haha}
			count={reactions.haha.length}
			isReacted={isReacted.haha}
			onClick={() => handleReactRecipe(Reactions.haha)}
		/>
	</div>
);

// Related Recipes Component - Displays a list of related recipes
const RelatedRecipesSection: React.FC<{ relatedRecipes: Recipe[] }> = ({ relatedRecipes }) => (
	<div>
		<Typography.Title level={1} className={"mb-10 font-playfair"}>
			You might also like
		</Typography.Title>
		<RecipeListSection listRecipes={pickRandomElements(relatedRecipes, 12)} />
	</div>
);

// Main Recipe Detail Component
export default function RecipeDetailPage() {
	// States
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [shareModalVisible, setShareModalVisible] = useState(false);
	const [isReacted, setIsReacted] = useState<Record<keyof Reaction, boolean>>({
		favorite: false,
		haha: false,
		like: false,
	});
	const [reactions, setReactions] = useState<Reaction>({
		favorite: [],
		haha: [],
		like: [],
	});

	// Zustand store
	const { user } = userStore((state) => state);
	const { saveFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);
	const { postReaction, removeReaction } = reactionStore((state) => state);
	// Hooks
	const { recipeId } = useParams();
	const { recipe, checkedIngredients, setCheckedIngredients } = useGetRecipeById(recipeId);
	const { bookmarked, setBookmarked } = useRecipeBookmark(recipeId);
	const { relatedRecipes } = useGetRelatedRecipes(recipe!);

	// useEffect to handle resizing of the window
	useEffectOnce(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	// useEffect to initialize reaction states
	useEffectOnce(() => {
		if (user && recipe) {
			setIsReacted({
				favorite: recipe.reactions.favorite.includes(user.id),
				haha: recipe.reactions.haha.includes(user.id),
				like: recipe.reactions.like.includes(user.id),
			});
			setReactions(recipe.reactions);
		}
	});

	// Controller
	const handleBookmarkClick = useAuthenticateFeature(async () => {
		setBookmarked(!bookmarked);
		if (!bookmarked) {
			const response = await saveFavoriteRecipe(recipeId!);
			if (!response.isSuccess) {
				message.error(response.message);
				return;
			}
		} else {
			// Remove from favorite
			const response = await removeFavoriteRecipe(recipeId!);
			if (!response.isSuccess) {
				message.error(response.message);
				return;
			}
		}
		showToast("success", `Recipe ${bookmarked ? "unbookmarked" : "bookmarked"}`);
	});

	const handleReactRecipe = useAuthenticateFeature(async (type: Reactions) => {
		let result;
		if ((isReacted as any)[Reactions[type]]) {
			// If user already reacted, then remove the reaction
			result = await removeReaction({
				reaction: type,
				targetID: recipe?.id as string,
				type: "recipe",
			});
		} else {
			// If user has not reacted, then add the reaction
			result = await postReaction({
				reaction: type,
				targetID: recipe?.id as string,
				type: "recipe",
			});
		}

		if (result.isSuccess) {
			showToast("success", result.message!);
			setReactions((prev) => ({
				...prev,
				[Reactions[type]]: !(isReacted as any)[Reactions[type]]
					? ((prev as any)[Reactions[type]] as string[]).concat(user?.id as string)
					: ((prev as any)[Reactions[type]] as string[]).filter(
							(userReacted: any) => userReacted != user?.id
						),
			}));
			setIsReacted((prev) => ({ ...prev, [Reactions[type]]: !(prev as any)[Reactions[type]] }));
		} else {
			showToast("error", result.message!);
		}
	});

	const handleIngredientToggle = useCallback(
		(index: number) => {
			const newCheckedIngredients = [...checkedIngredients];
			newCheckedIngredients[index] = !newCheckedIngredients[index];
			setCheckedIngredients(newCheckedIngredients);
		},
		[checkedIngredients, setCheckedIngredients]
	);

	// Render the recipe content, ingredients, instructions, reactions, and related recipes
	return recipe ? (
		<div
			style={{
				...(isMobile ? { maxWidth: "none" } : {}),
				margin: "auto",
				padding: "20px",
				color: "#333",
			}}
		>
			{/* Render the RecipeContent component */}
			<RecipeContent
				recipe={recipe}
				bookmarked={bookmarked}
				handleBookmarkClick={handleBookmarkClick}
				setShareModalVisible={setShareModalVisible}
			/>

			{/* Divider */}
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

			{/* Render RecipeIngredients and RecipeInstructions components */}
			<div className="block space-y-3 sm:flex sm:space-y-0">
				<RecipeIngredients
					recipe={recipe}
					checkedIngredients={checkedIngredients}
					handleIngredientToggle={handleIngredientToggle}
				/>
				<RecipeInstructions recipe={recipe}></RecipeInstructions>
			</div>

			{/* Divider */}
			<Divider></Divider>

			{/* Render RecipeReactions component */}
			<RecipeReactions
				reactions={reactions}
				isReacted={isReacted}
				handleReactRecipe={handleReactRecipe}
			/>

			{/* Divider */}
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

			{/* Render CommentSection component */}
			<CommentSection commentData={recipe.comments} recipe={recipe}></CommentSection>

			{/* Divider */}
			<Divider></Divider>

			{/* Render RelatedRecipesSection component */}
			<RelatedRecipesSection relatedRecipes={relatedRecipes} />

			{/* Render ShareRecipeModal component */}
			<ShareRecipeModal
				shareModalVisible={shareModalVisible}
				setShareModalVisible={setShareModalVisible}
				url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
			/>
		</div>
	) : (
		// If recipe is not found, render the NotFound component
		<NotFound></NotFound>
	);
}

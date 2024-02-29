import { useState, useEffect } from "react";
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
} from "@ant-design/icons";
import moment from "moment";
import Pasta from "@/assets/Icon/pasta.jpg";
import AppColor from "@/utils/appColor";
import { ShareRecipeModal } from "@/ui/components";
import { CommentSection } from "@/ui/section";
import { useParams } from "react-router-dom";
import NotFound from "../not-found.page";
import { recipeStore } from "@/zustand/recipe.store";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { useGetRecipeById, useRecipeBookmark } from "@/hooks/recipes";

export default function RecipeDetailPage() {
	// States
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [shareModalVisible, setShareModalVisible] = useState(false);
	const { saveFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);
	const { user } = userStore((state) => state);
	// Hooks
	const { recipeId } = useParams();
	const { recipe, checkedIngredients, setCheckedIngredients } = useGetRecipeById(recipeId);
	const { bookmarked, setBookmarked } = useRecipeBookmark(recipeId);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Controller
	const handleBookmarkClick = async () => {
		if (user == null) {
			showToast("error", "Please sign in to save your favorite recipe");
			return;
		}
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
	};

	const handleIngredientToggle = (index: number) => {
		const newCheckedIngredients = [...checkedIngredients];
		newCheckedIngredients[index] = !newCheckedIngredients[index];
		setCheckedIngredients(newCheckedIngredients);
	};

	return recipe ? (
		<div
			style={{
				...(isMobile ? { maxWidth: "none" } : {}),
				margin: "auto",
				padding: "20px",
				color: "#333",
			}}
		>
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
								{recipe.comments.length}
							</Typography.Text>
							<Divider
								className="hidden sm:inline-block"
								type="vertical"
								style={{ height: "20px", marginRight: "10px" }}
							/>
						</Col>
					</div>
				</div>
				<div className="space-y-3 sm:space-x-4">
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
						Servings: {recipe.portion}
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
					<Rate disabled allowHalf defaultValue={4.5} style={{ color: AppColor.deepOrangeColor }} />
					<Divider
						className="hidden sm:inline-block"
						type="vertical"
						style={{ height: "20px", marginRight: "10px" }}
					/>
				</Col>
			</div>
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
			<div className="block space-y-3 sm:flex sm:space-y-0">
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
								<div className="mt-3 md:grid md:grid-cols-3 md:gap-4">
									{instructor.imageUrls &&
										instructor.imageUrls.map((imageUrls) => (
											<Image width={200} height={200} src={imageUrls}></Image>
										))}
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

			<CommentSection listComments={recipe.comments}></CommentSection>

			<Divider></Divider>

			<Typography.Title level={1} className={"mb-10 font-playfair"}>
				You might also like
			</Typography.Title>

			<ShareRecipeModal
				shareModalVisible={shareModalVisible}
				setShareModalVisible={setShareModalVisible}
				url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
			/>
		</div>
	) : (
		<NotFound></NotFound>
	);
}

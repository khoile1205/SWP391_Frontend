import { useState, useCallback, useEffect } from "react";
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
	Modal,
	Row,
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
	LockOutlined,
	CreditCardOutlined,
	WalletOutlined,
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
import VnPayLogo from "@/assets/Icon/vnpay-seeklogo.svg";
import { paymentStore } from "@/zustand/payment.store";
import { CreatePaymentDTO, PurchaseRecipePaymentType } from "@/types/payment";
import { User } from "@/models/user.model";
import { PaymentType } from "@/enums/payment.type.enum";
import Result from "@/zustand/commons/result";

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
			{recipe.ingredients &&
				recipe.ingredients.map((ingredient, index) => (
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
							{ingredient.amount + " " + ingredient.name}
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
			{recipe.instructors &&
				recipe.instructors.map((instructor, index) => (
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
}> = ({ reactions, isReacted, handleReactRecipe }) => {
	return (
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
};

// Related Recipes Component - Displays a list of related recipes
const RelatedRecipesSection: React.FC<{ relatedRecipes: Recipe[] }> = ({ relatedRecipes }) => (
	<div>
		<Typography.Title level={1} className={"mb-10 font-playfair"}>
			You might also like
		</Typography.Title>
		<RecipeListSection listRecipes={pickRandomElements(relatedRecipes, 12)} />
	</div>
);

// Private Recipe Section - Displays the section for private recipes
interface RecipePrivatelySectionProps {
	onClick: () => Promise<void>;
}
const RecipePrivatelySection: React.FC<RecipePrivatelySectionProps> = ({ onClick }) => (
	<div className="flex h-96 flex-col items-center justify-center">
		<LockOutlined style={{ fontSize: "48px", color: "#faad14" }} />
		<Typography.Title level={3} className="mt-4 text-center">
			Unlock This Delicious Recipe
		</Typography.Title>
		<Typography.Paragraph className="text-center text-gray-600">
			This recipe is private and requires payment to access. Enjoy exclusive flavors with a one-time
			purchase.
		</Typography.Paragraph>
		<Button icon={<CreditCardOutlined />} className="bg-primary mt-4 text-white" onClick={onClick}>
			Pay Now
		</Button>
	</div>
);

interface SelectPaymentMethodModalProps {
	user: User | null;
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	recipe: Recipe;
	handlePayment: ({
		data,
		typeTransaction,
		recipeId,
	}: {
		data: CreatePaymentDTO;
		typeTransaction: PurchaseRecipePaymentType;
		recipeId: string;
	}) => Promise<Result>;
}
const SelectPaymentMethodModal: React.FC<SelectPaymentMethodModalProps> = ({
	user,
	modalVisible,
	setModalVisible,
	handlePayment,
	recipe,
}) => {
	const handlePaymentByWallet = async (data: any) => {
		// Add your logic to handle payment by wallet
		if (user && user.balance < recipe.recipePrice) {
			showToast("error", "You do not have enough balance to make this payment");
			return;
		}
		const response = await handlePayment({ ...data });
		if (response.isSuccess) {
			showToast("success", response.message!);
			setModalVisible(false);
		} else {
			showToast("error", response.message!);
		}
	};
	const handlePaymentByVnPay = async (data: any) => {
		// Add your logic to handle payment by wallet
		const response = await handlePayment({ ...data });
		if (response.isSuccess) {
			window.location.href = response.data;
		}
	};

	const handlePaymentMethod = useAuthenticateFeature(async (method: "Wallet" | "VnPay") => {
		const data = {
			data: {
				amount: recipe.recipePrice,
				name: user?.firstName + " " + user?.lastName,
				orderDescription: "Purchase recipe",
				orderType: PaymentType.PURCHASEDRECIPE,
			},
			recipeId: recipe.id,
			typeTransaction: method,
		};
		if (method === "Wallet") {
			handlePaymentByWallet(data);
		} else {
			handlePaymentByVnPay(data);
		}
		// Add your logic to handle the selected payment method
	});
	return (
		<div className="flex h-96 flex-col items-center justify-center">
			{/* Payment Modal */}
			<Modal
				title="Select Payment Method"
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}
				width={400}
			>
				{/* Display the recipe price and user balance */}
				<div className="mb-4">
					<Typography.Text strong style={{}}>
						Recipe Price:{" "}
					</Typography.Text>
					<Typography.Text strong style={{ color: "#1890FF" }}>
						${recipe.recipePrice}
					</Typography.Text>
				</div>
				<div className="mb-4">
					<Typography.Text strong style={{}}>
						User Balance:{" "}
					</Typography.Text>
					<Typography.Text
						strong
						style={{ color: user && user.balance < recipe.bookingPrice ? "#FF0000" : "#52C41A" }}
					>
						${user?.balance}
					</Typography.Text>
				</div>

				<Row gutter={[16, 16]} justify="center">
					<Col span={24}>
						<Button
							type="primary"
							icon={<WalletOutlined className="me-3" />}
							className="text-primary"
							block
							size="large"
							onClick={() => handlePaymentMethod("Wallet")}
							disabled={user != null && user.balance < recipe.recipePrice}
						>
							NestCooking Wallet
						</Button>
					</Col>
					<Col span={24}>
						<Button
							type="primary"
							block
							icon={<img src={VnPayLogo} alt="VnPay" className="me-3 w-8" />}
							size="large"
							className="text-primary"
							onClick={() => handlePaymentMethod("VnPay")}
						>
							VNPay
						</Button>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};
// Main Recipe Detail Component
export default function RecipeDetailPage() {
	// States
	const [paymentModalVisible, setPaymentModalVisible] = useState<boolean>(false);
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
	const { user, listUserPurcharseRecipe } = userStore((state) => state);
	const { saveFavoriteRecipe, removeFavoriteRecipe } = recipeStore((state) => state);
	const { postReaction, removeReaction } = reactionStore((state) => state);
	// Hooks
	const { recipeId } = useParams();
	const { recipe, checkedIngredients, setCheckedIngredients } = useGetRecipeById(recipeId);
	const { bookmarked, setBookmarked } = useRecipeBookmark(recipeId);
	const { relatedRecipes } = useGetRelatedRecipes(recipe!);
	const { payRecipe } = paymentStore((state) => state);

	useEffect(() => {
		// Check if the recipe is available before updating the title
		if (recipe) {
			document.title = `${recipe.title} - Nest Cooking`;
		}
	}, [recipe]);

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
	useEffect(() => {
		if (user && recipe) {
			setIsReacted({
				favorite: recipe.reactions ? recipe.reactions.favorite.includes(user.id) : false,
				haha: recipe.reactions ? recipe.reactions.haha.includes(user.id) : false,
				like: recipe.reactions ? recipe.reactions.like.includes(user.id) : false,
			});
			setReactions(recipe.reactions);
		}
	}, [recipe, user]);

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
	const handleOpenModalPayment = useAuthenticateFeature(async () => {
		setPaymentModalVisible(true);
	});
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

			{!recipe.isPrivate || (recipe.isPrivate && listUserPurcharseRecipe.includes(recipe.id)) ? (
				<>
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
				</>
			) : (
				<RecipePrivatelySection onClick={handleOpenModalPayment}></RecipePrivatelySection>
			)}
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

			{/* Render SelectPaymentMethodModal component */}
			<SelectPaymentMethodModal
				recipe={recipe}
				user={user}
				modalVisible={paymentModalVisible}
				setModalVisible={setPaymentModalVisible}
				handlePayment={payRecipe}
			/>
		</div>
	) : (
		// If recipe is not found, render the NotFound component
		<NotFound></NotFound>
	);
}

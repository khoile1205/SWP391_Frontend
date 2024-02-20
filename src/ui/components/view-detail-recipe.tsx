import React, { useState, useEffect } from "react";
import {
	Avatar,
	Divider,
	Button,
	List,
	Tooltip,
	message,
	Rate,
	Modal,
	Typography,
	Flex,
	Col,
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
} from "@ant-design/icons";
import moment from "moment";
import Pasta from "@/assets/Icon/pasta.jpg";
import AppColor from "@/utils/appColor";
import { CommentSection } from "../section/Comment";
import { SocialShareButton } from ".";
type CommentItem = {
	author: string;
	avatar: JSX.Element;
	content: JSX.Element;
	datetime: Date;
	likes: number;
	replying?: boolean;
};

interface RecipeDetail {
	title: string;
	username: string;
	date: string;
	commentCount: number;
	introduction: string;
	imageOrVideoUrl: string;
	ingredients: string[];
	instructions: string[];
	prepTime: string;
	servings: number;
}
const RecipeDetailPage: React.FC = () => {
	const [comments, setComments] = useState<CommentItem[]>([]);
	const [bookmarked, setBookmarked] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(Array(7).fill(false));
	const [shareModalVisible, setShareModalVisible] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const recipeDetail: RecipeDetail = {
			title: "Delicious Pasta",
			username: "John Doe",
			date: "February 7, 2024",
			commentCount: 20, // Increased comment count for demonstration
			introduction: "This pasta recipe is easy to make and full of flavor.",
			imageOrVideoUrl: Pasta,
			ingredients: ["Pasta", "Tomatoes", "Basil", "Olive Oil", "Garlic", "Salt", "Pepper"],
			instructions: [
				"Boil pasta until al dente",
				"Sauté garlic in olive oil",
				"Add chopped tomatoes and basil",
				"Combine with cooked pasta",
				"Season with salt and pepper",
			],
			prepTime: "20 minutes",
			servings: 4,
		};

		const initialComments: CommentItem[] = Array.from(
			{ length: recipeDetail.commentCount },
			(_, index) => ({
				author: "User " + (index + 1),
				avatar: <Avatar icon={<UserOutlined />} size={32} />,
				content: <p>This is a comment on the recipe.</p>,
				datetime: moment().subtract(index, "days").toDate(),
				likes: 0,
			})
		);
		setComments(initialComments);
	}, []);

	const handleBookmarkClick = () => {
		setBookmarked(!bookmarked);
		message.info(`Recipe ${bookmarked ? "unbookmarked" : "bookmarked"}`);
	};

	const handleIngredientToggle = (index: number) => {
		const newCheckedIngredients = [...checkedIngredients];
		newCheckedIngredients[index] = !newCheckedIngredients[index];
		setCheckedIngredients(newCheckedIngredients);
	};

	return (
		<div
			style={{
				...(isMobile ? { maxWidth: "none" } : {}),
				margin: "auto",
				padding: "20px",
				color: "#333",
			}}
		>
			<Flex align="center" justify="space-between">
				<div className="text-start">
					<Typography.Title className={"mb-10 font-playfair !text-5xl"}>
						Strawberry Cream Cheesecake
					</Typography.Title>
					<Flex align="center" className="mb-4">
						<div className="mr-5 flex items-center">
							<Col xs={12} md={7}>
								<Avatar size={"default"} icon={<UserOutlined />} style={{ marginRight: "10px" }} />
								<Typography.Text strong className="me-5">
									John Doe
								</Typography.Text>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
							</Col>
							<Col xs={12} md={8}>
								<CalendarOutlined className={"me-2 text-xl"} />
								<Typography.Text strong className="me-5">
									{moment(new Date()).format("ll")}
								</Typography.Text>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
							</Col>
							<Col xs={7} md={4}>
								<CommentOutlined className={"me-2 text-xl"} />
								<Typography.Text strong className="me-5">
									{comments.length}
								</Typography.Text>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
							</Col>
							<Col xs={0} md={8}>
								<Rate
									disabled
									allowHalf
									defaultValue={4.5}
									style={{ color: AppColor.deepOrangeColor }}
								/>
							</Col>
						</div>
					</Flex>
					<Flex align="center" className="mb-4 flex sm:hidden">
						<Col span={8} xs={24} md={8}>
							<Rate
								disabled
								allowHalf
								defaultValue={4.5}
								style={{ color: AppColor.deepOrangeColor }}
							/>
						</Col>
					</Flex>
				</div>
				<div>
					<Tooltip title="Share">
						<Button
							type="text"
							icon={<ShareAltOutlined className="!text-xl" />}
							style={{ marginRight: "10px" }}
							onClick={() => setShareModalVisible(true)}
						/>
					</Tooltip>
					<Tooltip title={bookmarked ? "Unbookmark" : "Bookmark"}>
						<Button
							type="text"
							icon={
								<BookOutlined
									className="!text-xl"
									style={{ fontSize: "36px", color: bookmarked ? "#1890ff" : "#000" }}
								/>
							}
							onClick={handleBookmarkClick}
						/>
					</Tooltip>
				</div>
			</Flex>
			<Typography.Paragraph className="font-inter text-lg">
				One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good
				Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!.
			</Typography.Paragraph>
			<img
				src={Pasta}
				alt="Recipe"
				className="rounded-xl"
				style={{
					width: "100%",
					height: "auto",
					border: "none",
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			/>
			<Flex align="center" className="mb-4">
				<div className="mr-5 flex items-center">
					<Col span={15}>
						<ClockCircleOutlined
							style={{ marginRight: "10px", fontSize: "24px", marginTop: "30px" }}
						/>
						<Typography.Text strong className="me-5">
							Prep Time: 20 minutes
						</Typography.Text>
						<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
					</Col>
					<Col span={10}>
						<TeamOutlined style={{ marginRight: "10px", fontSize: "24px", marginTop: "30px" }} />
						<Typography.Text strong className="me-5">
							Servings: 4
						</Typography.Text>
						<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
					</Col>
				</div>
			</Flex>
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
			<div className="block space-y-3 sm:flex sm:space-y-0">
				<div className="basis-2/5">
					<Typography.Title level={2} className={"mb-10 font-playfair "}>
						Ingredients
					</Typography.Title>
					<ul className="space-y-5">
						{["Pasta", "Tomatoes", "Basil", "Olive Oil", "Garlic", "Salt", "Pepper"].map(
							(ingredient, index) => (
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
										{ingredient}
									</Typography.Text>
								</List.Item>
							)
						)}
					</ul>
				</div>
				<div className="basis-3/5">
					<Typography.Title level={2} className={"mb-10 font-playfair"}>
						Instructions
					</Typography.Title>
					<ol style={{ paddingLeft: "20px", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
						{[
							"Boil pasta until al dente",
							"Sauté garlic in olive oil",
							"Add chopped tomatoes and basil",
							"Combine with cooked pasta",
							"Season with salt and pepper",
						].map((step, index) => (
							<li key={index} style={{ marginBottom: "25px" }}>
								<Typography.Text
									className={`text-md me-3 rounded-full px-2 py-1 font-inter font-medium text-white`}
									style={{ backgroundColor: AppColor.deepOrangeColor }}
								>
									{index + 1}
								</Typography.Text>
								<Typography.Text className={`font-inter text-lg font-medium`}>
									{step}
								</Typography.Text>
							</li>
						))}
					</ol>
				</div>
			</div>
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

			<CommentSection listComments={comments}></CommentSection>

			<Divider></Divider>

			<Typography.Title level={1} className={"mb-10 font-playfair"}>
				You might also like
			</Typography.Title>

			<Modal
				title="Share Recipe"
				open={shareModalVisible}
				onCancel={() => setShareModalVisible(false)}
				footer={null}
			>
				<div className="flex space-x-8">
					<SocialShareButton
						platform="Facebook"
						url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
					></SocialShareButton>
					<SocialShareButton
						platform="Twitter"
						url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
					></SocialShareButton>
				</div>
			</Modal>
		</div>
	);
};

export default RecipeDetailPage;

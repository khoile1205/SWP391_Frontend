import React, { useState, useEffect } from "react";
import { Avatar, Divider, Input, Button, List, Tooltip, message, Card, Rate } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	CommentOutlined,
	CheckOutlined,
	ShareAltOutlined,
	BookOutlined,
	LikeOutlined,
	MessageOutlined,
	WarningOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Pasta from "@/assets/Icon/pasta.jpg";

const { TextArea } = Input;

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
	const [likedComments, setLikedComments] = useState<number[]>([]);
	const [replyingTo, setReplyingTo] = useState<number | null>(null);
	const [bookmarked, setBookmarked] = useState(false);
	const [replyValue, setReplyValue] = useState("");
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(Array(7).fill(false));
	const [displayedComments, setDisplayedComments] = useState<number>(10);

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

	const timeElapsed = (datetime: Date) => {
		return moment(datetime).fromNow();
	};

	const handleLikeButtonClick = (index: number) => {
		const updatedComments = [...comments];
		const updatedLikes = [...likedComments];
		updatedComments[index] = {
			...updatedComments[index],
			likes: updatedComments[index].likes === 0 ? 1 : 0,
		};
		const indexOfComment = likedComments.indexOf(index);
		if (indexOfComment === -1) {
			updatedLikes.push(index);
		} else {
			updatedLikes.splice(indexOfComment, 1);
		}
		setComments(updatedComments);
		setLikedComments(updatedLikes);
		message.success(
			updatedComments[index].likes === 1 ? "You liked this comment!" : "You unliked this comment!"
		);
	};

	const handleBookmarkClick = () => {
		setBookmarked(!bookmarked);
		message.info(`Recipe ${bookmarked ? "unbookmarked" : "bookmarked"}`);
	};

	const handleReplyButtonClick = (index: number) => {
		setReplyingTo(index);
		setReplyValue("");
	};

	const handlePostComment = (value: string) => {
		if (value.trim() !== "") {
			const newComment = {
				author: "You",
				avatar: <Avatar icon={<UserOutlined />} size={32} />,
				content: <p>{value}</p>,
				datetime: new Date(),
				likes: 0,
			};
			if (replyingTo !== null) {
				const updatedComments = [...comments];
				updatedComments.splice(replyingTo + 1, 0, newComment);
				setComments(updatedComments);
				setReplyingTo(null);
				setReplyValue("");
				message.success("Your reply has been posted!");
			} else {
				setComments([...comments, newComment]);
				setReplyValue("");
				message.success("Your comment has been posted!");
			}
		} else {
			message.error("Please enter a comment!");
		}
	};

	const handleIngredientToggle = (index: number) => {
		const newCheckedIngredients = [...checkedIngredients];
		newCheckedIngredients[index] = !newCheckedIngredients[index];
		setCheckedIngredients(newCheckedIngredients);
	};

	const handleLoadMoreComments = () => {
		setDisplayedComments((prev) => prev + 10);
	};

	return (
		<div
			style={{
				...(isMobile ? { maxWidth: "none" } : {}),
				margin: "auto",
				padding: "20px",
				fontFamily: "Arial, sans-serif",
				color: "#333",
			}}
		>
			<Card bordered={false}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<div style={{ textAlign: "left" }}>
						<h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "10px" }}>
							Delicious Pasta Title
						</h1>
						<div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
							<Avatar size={64} icon={<UserOutlined />} style={{ marginRight: "10px" }} />
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginRight: "10px",
									fontSize: "24px",
								}}
							>
								<div style={{ marginRight: "10px", color: "#000", fontSize: "24px" }}>John Doe</div>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
								<CalendarOutlined style={{ marginRight: "5px", fontSize: "20px" }} />
								<div style={{ marginRight: "10px", color: "#000", fontSize: "24px" }}>
									February 7, 2024
								</div>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
								<CommentOutlined style={{ marginRight: "5px", fontSize: "20px" }} />
								<div style={{ marginRight: "10px", color: "#000", fontSize: "24px" }}>
									5 Comments
								</div>
								<Divider type="vertical" style={{ height: "20px", marginRight: "10px" }} />
								<Rate allowHalf defaultValue={4.5} style={{ fontSize: "20px" }} />
							</div>
						</div>
						<p
							style={{
								maxWidth: "1000px",
								fontSize: "28px",
								marginBottom: "20px",
								marginTop: "30px",
							}}
						>
							One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a
							good Italian meal. Here is a recipe I created after having this dish in a restaurant.
							Enjoy!.
						</p>
					</div>
					<div>
						<Tooltip title="Share">
							<Button
								type="text"
								icon={<ShareAltOutlined style={{ fontSize: "36px", color: "#1890ff" }} />}
								size="large"
								style={{ marginRight: "10px" }}
							/>
						</Tooltip>
						<Tooltip title={bookmarked ? "Unbookmark" : "Bookmark"}>
							<Button
								type="text"
								icon={
									<BookOutlined
										style={{ fontSize: "36px", color: bookmarked ? "#1890ff" : "#000" }}
									/>
								}
								size="large"
								onClick={handleBookmarkClick}
							/>
						</Tooltip>
					</div>
				</div>
			</Card>

			<img
				src={Pasta}
				alt="Recipe"
				style={{
					width: "100%",
					height: "auto",
					marginBottom: "20px",
					border: "none",
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			/>
			<div
				style={{
					marginTop: "20px",
					fontSize: "24px",
					display: "flex",
					alignItems: "center",
					textAlign: "left",
				}}
			>
				<p style={{ marginRight: "20px" }}>
					<ClockCircleOutlined
						style={{ marginRight: "10px", fontSize: "24px", marginTop: "30px" }}
					/>
					Prep Time: 20 minutes
				</p>
				<p>
					<TeamOutlined style={{ marginRight: "10px", fontSize: "24px", marginTop: "30px" }} />
					Servings: 4
				</p>
			</div>

			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
				<div>
					<Card>
						<h2
							style={{
								fontWeight: "bold",
								color: "#000",
								fontSize: "30px",
								marginBottom: "10px",
								fontFamily: "Arial",
							}}
						>
							Ingredients
						</h2>
						<ul style={{ paddingLeft: "20px", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
							{["Pasta", "Tomatoes", "Basil", "Olive Oil", "Garlic", "Salt", "Pepper"].map(
								(ingredient, index) => (
									<li
										key={index}
										style={{ marginBottom: "25px", display: "flex", alignItems: "center" }}
									>
										<div
											style={{
												width: "24px",
												height: "24px",
												borderRadius: "50%",
												border: "2px solid black",
												marginRight: "10px",
												cursor: "pointer",
												background: checkedIngredients[index] ? "white" : "none",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
											onClick={() => handleIngredientToggle(index)}
										>
											{checkedIngredients[index] && <CheckOutlined style={{ color: "orange" }} />}
										</div>
										<span>{ingredient}</span>
									</li>
								)
							)}
						</ul>
					</Card>
				</div>
				<div>
					<Card>
						<h2
							style={{
								fontWeight: "bold",
								color: "#000",
								fontSize: "30px",
								marginBottom: "10px",
								fontFamily: "Arial",
							}}
						>
							Instructions
						</h2>
						<ol style={{ paddingLeft: "20px", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
							{[
								"Boil pasta until al dente",
								"Sauté garlic in olive oil",
								"Add chopped tomatoes and basil",
								"Combine with cooked pasta",
								"Season with salt and pepper",
							].map((step, index) => (
								<li key={index} style={{ marginBottom: "25px" }}>
									<span style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bold" }}>
										{index + 1}.
									</span>
									<span>{step}</span>
								</li>
							))}
						</ol>
					</Card>
				</div>
			</div>
			<Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

			<Card>
				<h2 style={{ fontWeight: "bold", color: "#000", fontSize: "48px", marginBottom: "10px" }}>
					Comments ({comments.length})
				</h2>
				<List
					dataSource={comments.slice(0, displayedComments)}
					renderItem={(item, index) => (
						<List.Item
							style={{
								backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
								borderRadius: "5px",
								marginBottom: "20px",
								borderLeft: replyingTo === index ? "5px solid #1890ff" : "none",
								paddingLeft: replyingTo === index ? "10px" : "0",
							}}
						>
							<List.Item.Meta
								avatar={item.avatar}
								title={item.author}
								description={
									<div>
										{item.content}
										<br />
										<small style={{ color: "#555" }}>{timeElapsed(item.datetime)}</small>
									</div>
								}
							/>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Tooltip title="Like">
									<Button
										type="text"
										icon={<LikeOutlined />}
										size="large"
										onClick={() => handleLikeButtonClick(index)}
										style={{ color: likedComments.includes(index) ? "#1890ff" : "#000" }}
									>
										{item.likes}
									</Button>
								</Tooltip>
								<Tooltip title="Reply">
									<Button
										type="text"
										icon={<MessageOutlined />}
										size="large"
										onClick={() => handleReplyButtonClick(index)}
										style={{ background: "#fff", color: "#000", marginRight: "10px" }}
									>
										Reply
									</Button>
								</Tooltip>
								<Tooltip title="Report">
									<Button
										type="text"
										icon={<WarningOutlined />}
										size="large"
										style={{ background: "#fff", color: "#000" }}
									>
										Report
									</Button>
								</Tooltip>
							</div>
							{replyingTo === index && (
								<div style={{ marginLeft: "60px", marginTop: "10px" }}>
									<TextArea
										placeholder="Reply to this comment..."
										autoSize={{ minRows: 2, maxRows: 6 }}
										value={replyValue}
										onChange={(e) => setReplyValue(e.target.value)}
									/>
									<div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
										<Button
											type="text"
											icon={<CloseCircleOutlined />}
											size="large"
											onClick={() => setReplyingTo(null)}
											style={{
												background: "transparent",
												color: "#1890ff",
												border: "none",
												fontSize: "16px",
											}}
										>
											Cancel
										</Button>
										<Button
											type="primary"
											onClick={() => handlePostComment(replyValue)}
											style={{ background: "#1890ff" }}
										>
											Send
										</Button>
									</div>
								</div>
							)}
						</List.Item>
					)}
				/>
				{comments.length > displayedComments && (
					<div style={{ textAlign: "center", marginTop: "20px" }}>
						<Button
							type="primary"
							onClick={handleLoadMoreComments}
							style={{
								borderColor: "black",
								color: "black",
								width: "300px",
								height: "35px",
								fontWeight: "bold",
								marginBottom: "50px",
							}}
						>
							Load More Comments
						</Button>
					</div>
				)}
				<div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
					<TextArea
						placeholder="Leave a comment..."
						rows={4}
						style={{ marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
					/>
					<Button
						type="primary"
						onClick={() => handlePostComment(replyValue)}
						style={{
							borderColor: "none",
							color: "white",
							width: "225px",
							height: "35px",
							backgroundColor: "#FC6736",
							borderRadius: "4px",
							outline: "none",
							marginLeft: "20px",
						}}
					>
						Post Comment
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default RecipeDetailPage;

import { Comment } from "@/models/comment.model";
import { User } from "@/models/user.model";
import { IconText } from "@/ui/components";
import AppColor from "@/utils/appColor";
import userStore from "@/zustand/user.store";
import { MessageOutlined, HeartOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { List, Avatar, Typography, Button, Divider, Space, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "antd/es/typography/Link";
import { useFormik } from "formik";
import moment from "moment";
// import moment from "moment";
import { useState } from "react";
import * as Yup from "yup";

interface CommentProps {
	listComments: Comment[];
}

const commentRecipeValidationSchema = Yup.object().shape({
	comment: Yup.string().required("Comment is required"),
});
export const CommentSection: React.FC<CommentProps> = ({ listComments }) => {
	const { user } = userStore((state) => state);
	const [displayedComments, setDisplayedComments] = useState<number>(10);
	const [replyingTo, setReplyingTo] = useState<number | null>(null);
	const [replyValue, setReplyValue] = useState("");
	// const [likedComments, setLikedComments] = useState<number[]>([]);

	const commentFormik = useFormik({
		initialValues: {
			comment: "",
		},
		onSubmit: () => {
			// handlePostComment(commentFormik.values.comment);
		},
		validationSchema: commentRecipeValidationSchema,
	});

	// const handleLikeButtonClick = (index: number) => {
	// 	const updatedComments = [...listComments];
	// 	const updatedLikes = [...likedComments];
	// 	updatedComments[index] = {
	// 		...updatedComments[index],
	// 		likes: updatedComments[index].likes === 0 ? 1 : 0,
	// 	};
	// 	const indexOfComment = likedComments.indexOf(index);
	// 	if (indexOfComment === -1) {
	// 		updatedLikes.push(index);
	// 	} else {
	// 		updatedLikes.splice(indexOfComment, 1);
	// 	}
	// 	// setComments(updatedComments);
	// 	setLikedComments(updatedLikes);
	// 	// showToast(
	// 	// 	"success",
	// 	// 	updatedComments[index].likes === 1 ? "You liked this comment!" : "You unliked this comment!"
	// 	// );
	// };

	const handleReplyButtonClick = (index: number) => {
		setReplyingTo(index);
		setReplyValue("");
	};

	// const handlePostComment = (value: string) => {
	// 	if (value.trim() !== "") {
	// 		const newComment = {
	// 			author: "You",
	// 			avatar: <Avatar icon={<UserOutlined />} size={32} />,
	// 			content: <p>{value}</p>,
	// 			datetime: new Date(),
	// 			likes: 0,
	// 		};
	// 		if (replyingTo !== null) {
	// 			const updatedComments = [...listComments];
	// 			updatedComments.splice(replyingTo + 1, 0, newComment);
	// 			// setComments(updatedComments);
	// 			setReplyingTo(null);
	// 			setReplyValue("");
	// 			showToast("success", "Your reply has been posted!");
	// 		} else {
	// 			// setComments([...listComments, newComment]);
	// 			setReplyValue("");
	// 			showToast("success", "Your reply has been posted!");
	// 		}
	// 	} else {
	// 		// message.error("Please enter a comment!");
	// 	}
	// };

	const handleLoadMoreComments = () => {
		setDisplayedComments((prev) => prev + 10);
	};
	return (
		<>
			<Typography.Title className={"mb-10 font-playfair !text-5xl"}>
				Comments ({listComments.length})
			</Typography.Title>
			<List
				itemLayout="vertical"
				dataSource={listComments.slice(0, displayedComments)}
				loadMore={
					listComments.length > displayedComments && (
						<div className="mt-10 text-center">
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
					)
				}
				renderItem={(comment, index) => (
					<>
						<List.Item
							style={{
								// backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
								borderRadius: "5px",
								marginBottom: "20px",
								// borderLeft: replyingTo === index ? "5px solid #1890ff" : "none",
								// paddingLeft: replyingTo === index ? "10px" : "0",
							}}
							actions={[
								<IconText
									icon={MessageOutlined}
									onClick={() => handleReplyButtonClick(index)}
									text={`Reply (${2})`}
									key="list-vertical-star-o"
								/>,
								<IconText
									icon={HeartOutlined}
									// onClick={() => handleLikeButtonClick(1)}
									text="156"
									key="list-vertical-like-o"
								/>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Link
										href={`/user/${(comment.userId as User).firstName + " " + (comment.userId as User).lastName}`}
									>
										<Avatar src={(comment.userId as User).avatarUrl} />
									</Link>
								}
								title={
									<>
										<Link
											href={`/user/${(comment.userId as User).firstName + " " + (comment.userId as User).lastName}`}
										>
											<Typography className="font-bold">
												{(comment.userId as User).firstName +
													" " +
													(comment.userId as User).lastName}
											</Typography>
										</Link>
										<small className="text-[#00000073]">
											{moment(comment.createdAt).fromNow()}
										</small>
									</>
								}
								description={
									<Space direction="vertical">
										<Typography>{comment.content}</Typography>
									</Space>
								}
							/>
						</List.Item>
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
										// onClick={() => handlePostComment(replyValue)}
										style={{ background: "#1890ff" }}
									>
										Send
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			/>
			{listComments.length <= displayedComments && <Divider></Divider>}
			<div>
				<div className="block items-center justify-between sm:flex">
					<Typography.Title level={2} className={"mb-10 font-playfair"}>
						Write a comment
					</Typography.Title>
					{user == null && (
						<Typography className="font-inter font-semibold">
							<Typography.Text className="font-inter">
								<Link
									href="/sign-in"
									className="font-inter"
									style={{
										color: AppColor.deepOrangeColor,
									}}
								>
									Login{" "}
								</Link>
							</Typography.Text>
							to post the comment
						</Typography>
					)}
				</div>
				<Form onFinish={commentFormik.handleSubmit}>
					<TextArea
						placeholder="Leave a comment..."
						rows={4}
						{...commentFormik.getFieldProps("comment")}
						className="bg-gray-100 p-4"
						style={{ borderRadius: "5px", border: "1px solid #ccc" }}
					/>
					<div className="text-end">
						<Button
							htmlType="submit"
							type="primary"
							className="mt-4"
							style={{
								borderColor: "none",
								color: "white",
								backgroundColor: "#FC6736",
								borderRadius: "4px",
								outline: "none",
							}}
						>
							Post Comment
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};

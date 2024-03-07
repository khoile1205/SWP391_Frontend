import { CommentType } from "@/enums/comment.type.enum";
import { useAuthenticateFeature } from "@/hooks/common";
import { Comment, CommentEntity } from "@/models/comment.model";
import { Recipe } from "@/models/recipe.model";
import { CreateCommentDTO, initializeCommentData } from "@/types/comment";
import { CommentComponent } from "@/ui/components";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import { commentStore } from "@/zustand/comment.store";
import userStore from "@/zustand/user.store";
import { Form, Typography, List, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "antd/es/typography/Link";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface CommentProps {
	commentData: Comment;
	recipe: Recipe;
}

const commentRecipeValidationSchema = Yup.object().shape({
	comment: Yup.string().required("Comment is required"),
});

// const renderComments = (
// 	comment: CommentEntity,
// 	level: number,
// 	replyingTo: string | null,
// 	setReplyingTo: (commentId: string | null) => void
// ) => {
// 	const currentLevel = level;
// 	return (
// 		<>
// 			<div key={comment.commentId}>
// 				<CommentComponent
// 					comment={comment}
// 					level={level}
// 					replyingTo={replyingTo}
// 					setReplyingTo={setReplyingTo}
// 				/>
// 				{comment.listChildComments && comment.listChildComments.length > 0 && (
// 					<div>
// 						{comment.listChildComments.map((child) =>
// 							renderComments(child, currentLevel + 1, replyingTo, setReplyingTo)
// 						)}
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// };
export const CommentSection: React.FC<CommentProps> = ({ commentData, recipe }) => {
	const [visibleComments, setVisibleComments] = useState<CommentEntity[]>(commentData.data);
	const [commentLength, setCommentLength] = useState<number>(commentData.total);
	const { user } = userStore((state) => state);
	const [displayedComments, setDisplayedComments] = useState<number>(10);
	const [replyingTo, setReplyingTo] = useState<string | null>(null);

	const { postComment } = commentStore((state) => state);

	const commentFormik = useFormik({
		initialValues: {
			comment: "",
		},
		onSubmit: () => {
			handlePostComment(commentFormik.values.comment, CommentType.Recipe);
		},
		validationSchema: commentRecipeValidationSchema,
	});

	const handlePostComment = useAuthenticateFeature(async (value: string, type: CommentType) => {
		// Set data
		const data: CreateCommentDTO = {
			parentCommentId: null,
			content: value.trim(),
			recipeId: recipe.id,
			type,
		};

		// Fetch API
		const response = await postComment(data);

		// Handle result
		if (response.isSuccess) {
			commentFormik.resetForm();
			const newComment: CommentEntity = initializeCommentData({
				commentData: response.data,
				user: user!,
			});
			setCommentLength((prev) => prev + 1);
			setVisibleComments((prev) => [...prev, newComment]);
			showToast("success", "Your comment has been posted!");
		}
	});

	const handleLoadMoreComments = () => {
		setDisplayedComments((prev) => prev + 10);
	};
	return (
		<>
			<Typography.Title level={1} className={"mb-10 font-playfair"}>
				Comments ({commentLength})
			</Typography.Title>
			<List
				itemLayout="vertical"
				dataSource={visibleComments.slice(0, displayedComments)}
				loadMore={
					visibleComments.length > displayedComments && (
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
				renderItem={(comment) => (
					<>
						{
							<CommentComponent
								comment={comment}
								level={0}
								replyingTo={replyingTo}
								setReplyingTo={setReplyingTo}
							></CommentComponent>
						}
					</>
				)}
			/>
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

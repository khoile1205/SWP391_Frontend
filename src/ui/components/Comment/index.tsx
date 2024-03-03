import { CommentEntity } from "@/models/comment.model";
import { Avatar, Button, Divider, Flex, Form, List, Space, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { IconText, ReactionButton } from "..";
import { CloseCircleOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import moment from "moment";
import Link from "antd/es/typography/Link";
import { reactionStore } from "@/zustand/reaction.store";
import { Reactions } from "@/enums/reaction.enum";
import { useAuthenticateFeature } from "@/hooks/common";
import { Reaction } from "@/types/reaction";
import TextArea from "antd/es/input/TextArea";
import { commentStore } from "@/zustand/comment.store";
import { CommentType } from "@/enums/comment.type.enum";
import { useFormik } from "formik";
import * as Yup from "yup";
import { initializeCommentData } from "@/types/comment";
import userStore from "@/zustand/user.store";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { useEffectOnce } from "usehooks-ts";

interface CommentProps {
	comment: CommentEntity;
	level: number;
	replyingTo: string | null;
	setReplyingTo: (commentId: string | null) => void;
}
export const CommentComponent: React.FC<CommentProps> = ({
	comment,
	level,
	replyingTo,
	setReplyingTo,
}) => {
	// State local
	const [numberOfReplies, setNumberOfReplies] = useState<number>(comment.listChildComments.length);
	const [visibleReplies, setVisibleReplies] = useState<CommentEntity[]>([]);
	const [reactions, setReactions] = useState<Reaction>(comment.reactions);
	const [replying, setReplying] = useState(false);
	const [displayReplies, setDisplayReplies] = useState<number>(1);
	const [isReacted, setIsReacted] = useState<Record<keyof Reaction, boolean>>({
		favorite: false,
		haha: false,
		like: false,
	});

	// Zustand store
	const { postReaction, removeReaction } = reactionStore((state) => state);
	const { postComment } = commentStore((state) => state);
	const { user } = userStore((state) => state);

	// Hooks
	useEffectOnce(() => {
		if (level <= 1) {
			setDisplayReplies(2);
		}
	});
	useEffectOnce(() => {
		if (user && comment) {
			setIsReacted({
				favorite: comment.reactions.favorite.includes(user.id),
				haha: comment.reactions.haha.includes(user.id),
				like: comment.reactions.like.includes(user.id),
			});
		}
	});
	// Memorize state
	const isLastReply = useMemo(() => {
		return (index: number) => index === visibleReplies.length - 1;
	}, [visibleReplies.length]);

	const marginCommentForLevel = useMemo(() => {
		if (window.innerWidth <= 767) {
			return 20; // mobile
		} else if (window.innerWidth <= 1023) {
			return 40; // tablet
		} else {
			return 80; // desktop
		}
	}, []);

	// Handle event
	const handleReplyButtonClick = () => {
		// If comment is at level more than 2, directly show the replies
		setReplyingTo(replyingTo === comment.commentId ? null : comment.commentId);
		setReplying(!replying);
	};
	const handleCancelReply = () => {
		setReplyingTo(null);
		setReplying(false);
	};
	const handleLoadMoreReplies = () => {
		setDisplayReplies((prev) => prev + 3);
	};

	// Controllers
	const handleReactComment = useAuthenticateFeature(async (type: Reactions) => {
		let result;
		if ((isReacted as any)[Reactions[type]]) {
			// If user already reacted, then remove the reaction
			result = await removeReaction({
				reaction: type,
				targetID: comment.commentId,
				type: "comment",
			});
		} else {
			// If user has not reacted, then add the reaction
			result = await postReaction({
				reaction: type,
				targetID: comment.commentId,
				type: "comment",
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

	const handleReplyComment = useAuthenticateFeature(async () => {
		const response = await postComment({
			content: replyCommentFormik.values.replyComment,
			parentCommentId: comment.commentId,
			recipeId: comment.recipeId,
			type: CommentType.Comment,
		});
		if (response.isSuccess) {
			replyCommentFormik.resetForm();
			setReplying(false);
			setReplyingTo(null);
			const newReplyComment: CommentEntity = initializeCommentData({
				commentData: response.data,
				user: user!,
			});
			setVisibleReplies((prev) => [...prev, newReplyComment]);
			setNumberOfReplies((prev) => prev + 1);
			showToast("success", AppString.commentSuccessMessage);
		} else {
			showToast("error", AppString.somthingWentWrongMessage);
		}
	});

	// Formik
	const replyCommentFormik = useFormik({
		initialValues: {
			replyComment: "",
		},
		onSubmit: handleReplyComment,
		validationSchema: Yup.object().shape({
			replyComment: Yup.string().required("Reply comment is required"),
		}),
	});

	return (
		<>
			<List.Item
				style={{
					borderRadius: "5px",
					marginBottom: "20px",
					marginLeft: `${marginCommentForLevel * level}px`,
					borderBottom: isLastReply(-1) ? "1px solid #e8e8e8" : "none", // Apply border for the last action comment
				}}
				actions={[
					<IconText
						icon={MessageOutlined}
						onClick={handleReplyButtonClick}
						text={`Reply (${numberOfReplies})`}
						key="list-vertical-star-o"
					/>,
					<ReactionButton
						reactionType={Reactions.like}
						count={reactions.like.length}
						isReacted={isReacted.like}
						onClick={() => handleReactComment(Reactions.like)}
					/>,
					<ReactionButton
						reactionType={Reactions.favorite}
						count={reactions.favorite.length}
						isReacted={isReacted.favorite}
						onClick={() => handleReactComment(Reactions.favorite)}
					/>,
					<ReactionButton
						reactionType={Reactions.haha}
						count={reactions.haha.length}
						isReacted={isReacted.haha}
						onClick={() => handleReactComment(Reactions.haha)}
					/>,
				]}
			>
				<List.Item.Meta
					avatar={
						<Link href={`/user/${(comment.userId as User).id}`}>
							<Avatar src={(comment.userId as User).avatarUrl} />
						</Link>
					}
					title={
						<>
							<Link href={`/user/${(comment.userId as User).id}`}>
								<Typography className="font-bold">
									{(comment.userId as User).firstName + " " + (comment.userId as User).lastName}
								</Typography>
							</Link>
							<small className="text-[#00000073]">{moment(comment.createdAt).fromNow()}</small>
						</>
					}
					description={
						<Space direction="vertical">
							<Typography>{comment.content}</Typography>
						</Space>
					}
				/>
			</List.Item>
			{comment.listChildComments &&
				comment.listChildComments.length > 0 &&
				comment.listChildComments
					.slice(0, displayReplies)
					.map((child) => (
						<CommentComponent
							key={child.commentId}
							comment={child}
							level={level + 1}
							replyingTo={replyingTo}
							setReplyingTo={setReplyingTo}
						/>
					))}
			{comment.listChildComments && comment.listChildComments.length > displayReplies && (
				<div className="mt-2 text-center">
					<Button type="link" onClick={handleLoadMoreReplies}>
						Load More Replies
					</Button>
				</div>
			)}
			{replyingTo == comment.commentId && (
				<div style={{ marginLeft: `${marginCommentForLevel * (level + 1)}px`, marginTop: "10px" }}>
					<Form onFinish={replyCommentFormik.handleSubmit}>
						<TextArea
							placeholder="Reply to this comment..."
							autoSize={{ minRows: 2, maxRows: 6 }}
							{...replyCommentFormik.getFieldProps("replyComment")}
							style={{
								borderColor:
									replyCommentFormik.touched.replyComment && replyCommentFormik.errors.replyComment
										? "red"
										: "inherit",
							}}
						/>
						{replyCommentFormik.touched.replyComment && replyCommentFormik.errors.replyComment && (
							<div className="ms-2 mt-2 text-red-500">{replyCommentFormik.errors.replyComment}</div>
						)}
						<Flex align="center" justify="end" className="mt-3 space-x-3">
							<Button
								type="dashed"
								icon={<CloseCircleOutlined />}
								size="middle"
								onClick={() => {
									replyCommentFormik.resetForm();
									handleCancelReply();
								}}
							>
								Cancel
							</Button>
							<Button htmlType="submit" icon={<SendOutlined />} className="bg-primary text-white">
								Send
							</Button>
						</Flex>
					</Form>
				</div>
			)}

			{visibleReplies.map((reply, index) => (
				<>
					<CommentComponent
						key={reply.commentId}
						comment={reply}
						level={level + 1}
						replyingTo={replyingTo}
						setReplyingTo={setReplyingTo}
					/>
					{index < visibleReplies.length - 1 && (
						<Divider style={{ margin: 0, borderTop: "1px solid #e8e8e8" }} />
						/* Apply border for all but the last reply */
					)}
				</>
			))}
		</>
	);
};

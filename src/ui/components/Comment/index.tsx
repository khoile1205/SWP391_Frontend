import { Comment } from "@/models/comment.model";
import { Avatar, List, Space, Typography } from "antd";
import React from "react";
import { IconText } from "..";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import moment from "moment";
import Link from "antd/es/typography/Link";

const marginComment = 50;

interface CommentProps {
	comment: Comment;
	level: number;
}
export const CommentComponent: React.FC<CommentProps> = ({ comment, level }) => {
	const handleReactComment = () => {
		console.log(comment.commentId);
	};
	return (
		<List.Item
			style={{
				borderRadius: "5px",
				marginBottom: "20px",
				marginLeft: `${marginComment * level}px`,
			}}
			actions={[
				<IconText
					icon={MessageOutlined}
					// onClick={() => handleReplyButtonClick(index)}
					text={`Reply (${comment.listChildComments.length})`}
					key="list-vertical-star-o"
				/>,
				<IconText
					icon={HeartOutlined}
					onClick={() => handleReactComment()}
					text={(
						comment.reaction.favorite +
						comment.reaction.haha +
						comment.reaction.like
					).toString()}
					key="list-vertical-like-o"
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
	);
};

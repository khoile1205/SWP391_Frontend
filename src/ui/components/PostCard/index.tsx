import { useEffect, useState } from "react";
import { Rate, Typography, Card } from "antd";
import { Post } from "@/models/post.model";

interface PostCardProps {
	post: Post;
}
export const PostCard = ({ post }: PostCardProps) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timeOutId);
	});
	return (
		<>
			<a href={`/posts/${post.id}`}>
				<Card loading={loading} bordered={false} cover={<img alt="example" src={post.thumbnail} />}>
					{/* <Meta title="Card title" description="This is the description" /> */}
					<Rate
						disabled
						defaultValue={post.rating}
						style={{
							color: "#ff642F",
						}}
					/>
					<Typography.Title level={5} className="mt-3">
						{post.title}
					</Typography.Title>
				</Card>
			</a>
		</>
	);
};

import React, { useEffect, useState } from "react";
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
				<Card
					loading={loading}
					bordered={false}
					cover={
						<img
							alt="example"
							src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						/>
					}
				>
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

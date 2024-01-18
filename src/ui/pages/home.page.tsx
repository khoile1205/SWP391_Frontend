import { Typography } from "antd";
import { CategoryCard, Header, PostCard } from "../components";
import { POSTS } from "@/assets/data/posts";
import { CATEGORIES } from "@/assets/data/categories";

function HomePage() {
	return (
		<>
			<div className="">
				<Typography.Title level={2}>Special Recipes</Typography.Title>
				<div className="md:grid md:grid-cols-3 md:gap-4">
					{POSTS.slice(0, 3).map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>

			<div className="mt-3">
				<Typography.Title level={2}>Special Recipes</Typography.Title>
				<div className="md:grid md:grid-cols-3 md:gap-4">
					{POSTS.slice(0, 3).map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>

			<div className="mt-3">
				<Typography.Title level={2} className="mb-3">
					Popular Categories
				</Typography.Title>
				<div className="grid grid-cols-3 justify-between space-x-3 text-center md:grid-cols-6">
					{CATEGORIES.slice(0, 6).map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</div>
			</div>
		</>
	);
}

export { HomePage };

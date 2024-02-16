import { Typography } from "antd";
import { CategoryCard, PostCard } from "../components";
import { POSTS } from "@/assets/data/posts";
import { useCategories } from "@/hooks/useCategories";
import { useLoadingStore } from "@/zustand/loading.store";

export function HomePage() {
	const { categories } = useCategories();
	const { isLoading } = useLoadingStore((state) => state);
	return (
		<div className="mt-10">
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
					{POSTS.slice(3, 6).map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>

			<div className="mt-3">
				<Typography.Title level={2} className="mb-3">
					Popular Categories
				</Typography.Title>
				<div className="grid grid-cols-3 justify-between space-x-3 text-center md:grid-cols-6">
					{categories.slice(0, 6).map((category) => (
						<CategoryCard key={category.id} category={category} isLoading={isLoading} />
					))}
				</div>
			</div>
		</div>
	);
}

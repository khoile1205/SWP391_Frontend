import { useEffect, useState } from "react";
import { Typography } from "antd";
import { categoriesStore } from "@/zustand/category.store";
import { CategoryCard } from "@/ui/components";
import Loadmore from "@/ui/components/Loadmore";
import { Category } from "@/types/recipe";

export default function CategoryHomepage() {
	const { categories } = categoriesStore((state) => state);
	const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
	const [loadMoreCount, setLoadMoreCount] = useState<number>(1);

	const handleLoadMore = () => {
		const nextVisibleCategories = categories.slice(0, 20 * (loadMoreCount + 1));
		setVisibleCategories(nextVisibleCategories);
		setLoadMoreCount(loadMoreCount + 1);
	};

	useEffect(() => {
		if (categories.length > 0) {
			setVisibleCategories(categories.slice(0, 20));
		}
	}, [categories]);
	return (
		<div>
			<Typography.Title level={2}>Categories</Typography.Title>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				{visibleCategories.map((category) => (
					<CategoryCard category={category} key={category.id}></CategoryCard>
				))}
			</div>
			{visibleCategories.length < categories.length && (
				<Loadmore onClick={handleLoadMore} title="Load More Comment"></Loadmore>
			)}
		</div>
	);
}

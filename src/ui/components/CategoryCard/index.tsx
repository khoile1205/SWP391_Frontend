import { Category } from "@/types/recipe";
import { useLoadingStore } from "@/zustand/loading.store";
import { Avatar, Skeleton, Typography } from "antd";

interface CategoryCardProps {
	category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
	const { isLoading } = useLoadingStore((state) => state);
	console.log(category);
	return (
		<Skeleton loading={isLoading}>
			<a href={`/category/${category.id}`} className="text-center">
				<Avatar
					size={{ xs: 36, sm: 48, md: 60, lg: 96, xl: 120, xxl: 150 }}
					src={
						category.imageUrl ||
						"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
					}
				/>
				<Typography.Title level={5} className="mt-2">
					{category.name}
				</Typography.Title>
			</a>
		</Skeleton>
	);
}

import { Category } from "@/models/category.model";
import { Avatar, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";

interface CategoryCardProps {
	category: Category;
}
export function CategoryCard({ category }: CategoryCardProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timeOutId);
	}, []);
	return (
		<Skeleton loading={isLoading}>
			<a href={`/category/${category.id}`} className="text-center">
				<Avatar
					size={{ xs: 36, sm: 48, md: 60, lg: 96, xl: 120, xxl: 150 }}
					src={category.imageURL}
				/>
				<Typography.Title level={5} className="mt-2">
					{category.name}
				</Typography.Title>
			</a>
		</Skeleton>
	);
}

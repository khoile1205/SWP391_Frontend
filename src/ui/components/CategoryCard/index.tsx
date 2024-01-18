import { Category } from "@/models/category.model";
import { Avatar, Typography } from "antd";
import React from "react";

interface CategoryCardProps {
	category: Category;
}
export function CategoryCard({ category }: CategoryCardProps) {
	return (
		<a href={`/category/${category.id}`} className="text-center">
			{/* <img
				src={category.imageURL}
				className=""
				style={{
					borderRadius: "50%",
				}}
				alt="image"
			/> */}
			<Avatar
				size={{ xs: 36, sm: 48, md: 60, lg: 96, xl: 120, xxl: 150 }}
				src={category.imageURL}
			/>
			<Typography.Title level={5} className="mt-2">
				{category.name}
			</Typography.Title>
		</a>
	);
}

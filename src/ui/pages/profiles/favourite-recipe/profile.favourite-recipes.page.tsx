import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Column } from "@/types/@override/Table";
import React, { useEffect, useState } from "react";
import { PaginationTable, PaginationPageSize, ConfirmModal } from "@/ui/components";
import { Tooltip, Flex, Button, Image, Typography } from "antd";
import { Recipe } from "@/models/recipe.model";
import { useGetFavouriteRecipes } from "@/hooks/profiles/useGetFavouriteRecipes";

export default function AdminReportPage() {
	const { data, handleRemoveFavoriteRecipe } = useGetFavouriteRecipes();
	const [listRecipes, setListRecipes] = useState<Recipe[]>(data);

	useEffect(() => {
		setListRecipes(data);
	}, [data]);

	const [pageSize, setPageSize] = React.useState<number>(5);

	// Event handler
	const handleOk = async (recipeId: string) => {
		await handleRemoveFavoriteRecipe(recipeId);
		setListRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
	};

	const columns: Column<Recipe>[] = [
		{
			title: "Title",
			dataIndex: "title",
			width: "30%",
			align: "center",
			render: (_text: string, record: Recipe) => (
				<Tooltip title={record.title}>{record.title}</Tooltip>
			),
		},
		{
			title: "Thumbnail",
			dataIndex: "thumbnailUrl",
			align: "center",
			width: "30%",
			render: (_text: string, record: Recipe) => <Image src={record.thumbnailUrl} />,
		},
		{
			title: "Owner",
			dataIndex: "user",
			align: "center",
			width: "20%",
			render: (_text: string, record: Recipe) => (
				<Tooltip title={record.user.firstName + " " + record.user.lastName}>
					<Typography.Link className="!text-primary" href={record.user.id}>
						{record.user.firstName + " " + record.user.lastName}
					</Typography.Link>
				</Tooltip>
			),
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			width: "30%",
			sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			render: (_text: string, record: Recipe) => (
				<Typography>{new Date(record.createdAt).toLocaleDateString("vi-VN")}</Typography>
			),
		},
		{
			title: "",
			align: "center",
			width: "13%",

			render: (_text: any, record: Recipe) => (
				<Flex justify="center">
					<Button
						type="text"
						href={`/recipe/${record.id}`}
						icon={<EyeOutlined className="text-primary" style={{ fontSize: "16px" }} />}
					></Button>
					<Button
						type="text"
						icon={<DeleteOutlined className="text-primary" style={{ fontSize: "16px" }} />}
						onClick={() =>
							ConfirmModal({
								content: "Are you sure you want to remove this recipe out of favourite ?",
								onOk: () => handleOk(record.id),
							})
						}
					/>
				</Flex>
			),
		},
	];

	return (
		<div className="w-100vh flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">Favourite Recipes</h2>

			<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
			<PaginationTable columns={columns} dataSource={listRecipes} pageSize={pageSize} />
		</div>
	);
}

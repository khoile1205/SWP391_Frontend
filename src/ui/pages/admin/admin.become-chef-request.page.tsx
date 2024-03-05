import { Table, Button, Input, Tooltip, Image, Flex, Typography, Select } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Recipe } from "@/models/recipe.model";
import userStore from "@/zustand/user.store";
import { ConfirmModal } from "@/ui/components";
import { useEffect, useState } from "react";
import { recipeStore } from "@/zustand/recipe.store";
import { showToast } from "@/utils/notify";
import { useGetRecipesByUserIdWithPagination } from "@/hooks/recipes";
import { Column } from "@/types/@override/Table";

export default function AdminBecomeChefRequestPage() {
	const { user } = userStore((state) => state);
	const { deleteRecipeById } = recipeStore((state) => state);
	const { visibleRecipes } = useGetRecipesByUserIdWithPagination(user?.id);

	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [pageSize, setPageSize] = useState<number>(5);

	useEffect(() => {
		if (visibleRecipes.length > 0) {
			setRecipes([...visibleRecipes]);
		}
	}, [visibleRecipes]);

	const handleSearchTitle = (title: string) => {
		if (!title) {
			setRecipes([...visibleRecipes]);
			return;
		}
		const newRecipes = visibleRecipes.filter((recipe) =>
			recipe.title.toLowerCase().includes(title.toLowerCase())
		);
		setRecipes(newRecipes);
	};

	const handleDeleteRecipe = async (recipeId: string) => {
		const response = await deleteRecipeById(recipeId);
		if (response.isSuccess) {
			showToast("success", response.message as string);
			const newRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
			setRecipes(newRecipes);
		} else {
			showToast("error", response.message as string);
		}
	};
	const columns: Column<Recipe>[] = [
		{
			title: "ID",
			dataIndex: "id",
			align: "center",
			width: "30%",
			sorter: (a, b) => a.id.localeCompare(b.id),
		},
		{
			title: "Thumbnail",
			dataIndex: "thumbnailUrl",
			align: "center",
			width: "20%",
			render: (_text: string, record: Recipe) => <Image src={record.thumbnailUrl}></Image>,
		},
		{
			title: "Title",
			dataIndex: "title",
			width: "20%",
			align: "center",

			render: (_text: string, record: Recipe) => (
				<Tooltip title={record.title}>{record.title}</Tooltip>
			),
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: "Difficult",
			dataIndex: "difficult",
			align: "center",
			width: "20%",

			render: (price: number) => <span>{price}</span>,
			sorter: (a, b) => a.difficult - b.difficult,
		},
		{
			title: "",
			align: "center",
			width: "13%",

			render: (_text: any, record: Recipe) => (
				<Flex justify="center">
					<Button
						href={`/recipes/${record.id}`}
						type="text"
						icon={<EyeOutlined className="text-primary" style={{ fontSize: "16px" }} />}
					/>
					<Button
						href={`recipes/edit/${record.id}`}
						type="text"
						icon={<EditOutlined className="text-primary" style={{ fontSize: "16px" }} />}
					/>
					<Button
						type="text"
						icon={<DeleteOutlined className="text-primary" style={{ fontSize: "16px" }} />}
						onClick={() =>
							ConfirmModal({
								content: "Are you sure you want to delete this recipe?",
								onOk: () => {
									handleDeleteRecipe(record.id);
								},
							})
						}
					/>
				</Flex>
			),
		},
	];

	return (
		<div className="flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">View Created Recipes</h2>

			<Flex className="mb-4 w-full" align="center" justify="space-between">
				<Flex align="center" className="space-x-3">
					<Typography.Text>Search </Typography.Text>
					<span>
						<Input
							type="text"
							placeholder="Search recipes by title ..."
							className="focus:border-blue-500 rounded-md border-gray-300 px-3 py-2 focus:outline-none"
							onChange={(e) => handleSearchTitle(e.target.value)}
						/>
					</span>
				</Flex>
				<Flex align="center" className="space-x-3">
					<Typography>Rows per page: </Typography>
					<Select
						defaultValue={pageSize}
						options={[
							{
								label: 5,
								value: 5,
							},
							{
								label: 10,
								value: 10,
							},
							{
								label: 15,
								value: 15,
							},
						]}
						onChange={(value: number) => setPageSize(value)}
					></Select>
				</Flex>
			</Flex>
			<Table
				columns={columns}
				dataSource={recipes}
				pagination={{
					defaultPageSize: 5,
					showSizeChanger: false,
					pageSize: pageSize,
				}}
				bordered
				className="rounded-lg shadow-md"
				rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
				scroll={{ y: 700 }}
			/>
		</div>
	);
}

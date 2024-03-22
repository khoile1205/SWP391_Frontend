import { Button, Tooltip, Image, Flex, Typography, Input } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Recipe } from "@/models/recipe.model";
import { ConfirmModal, PaginationPageSize, PaginationTable } from "@/ui/components";
import { useEffect, useState } from "react";
import { recipeStore } from "@/zustand/recipe.store";
import { showToast } from "@/utils/notify";
import { Column } from "@/types/@override/Table";
import { useGetAllRecipes } from "@/hooks/admin";
import AppColor from "@/utils/appColor";
import { adminStore } from "@/zustand/admin.store";
import { VerifyRecipeDTO } from "@/types/admin";
import { useAuthenticateFeature } from "@/hooks/common";
import { ActionStatus } from "@/enums";

const renderVerifiedRecipes = (recipe: Recipe) => {
	return (
		<Typography.Text type={recipe.isVerified && recipe.isPublic ? "success" : "danger"}>
			{recipe.isVerified ? (recipe.isPublic ? "Verified" : "Rejected") : "Not Verified"}
		</Typography.Text>
	);
};
export default function AdminRecipePage() {
	const { deleteRecipeById } = recipeStore((state) => state);
	const { handleVerifyPublicRecipe } = adminStore((state) => state);

	const { data } = useGetAllRecipes();

	const [listRecipes, setListRecipes] = useState<Recipe[]>(data);
	const [pageSize, setPageSize] = useState<number>(5);

	useEffect(() => {
		setListRecipes(data);
	}, [data]);

	const handleSearchTitle = (title: string) => {
		if (title) {
			const newRecipes = data.filter((recipe) =>
				recipe.title.toLowerCase().includes(title.toLowerCase())
			);
			setListRecipes(newRecipes);
		} else {
			setListRecipes(data);
		}
	};
	const handleDeleteRecipe = async (recipeId: string) => {
		const response = await deleteRecipeById(recipeId);
		if (response.isSuccess) {
			showToast("success", response.message as string);
			const newRecipes = listRecipes.filter((recipe) => recipe.id !== recipeId);
			setListRecipes(newRecipes);
		} else {
			showToast("error", response.message as string);
		}
	};

	const handleVerifyRecipe = useAuthenticateFeature(
		async ({ recipe, status }: { recipe: Recipe; status: ActionStatus }) => {
			const data: VerifyRecipeDTO = {
				recipeId: recipe.id,
				status: status,
			};
			const response = await handleVerifyPublicRecipe(data);
			if (response.isSuccess) {
				showToast("success", response.message as string);
				setListRecipes((prev) =>
					prev.map((item) =>
						item.id === recipe.id
							? { ...item, isVerified: true, isPublic: status === ActionStatus.ACCEPTED }
							: item
					)
				);
			} else {
				showToast("error", response.message as string);
			}
		}
	);
	const columns: Column<Recipe>[] = [
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
		},
		{
			title: "Verified",
			dataIndex: "isVerified",
			align: "center",
			width: "20%",
			render: (_, record: Recipe) => renderVerifiedRecipes(record),
			filters: [
				{
					text: "Verified",
					value: true,
				},
				{
					text: "Not Verified",
					value: false,
				},
			],
			onFilter: (value, record) => record.isVerified === value,
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			width: "20%",
			render: (createdAt: Date) => (
				<Typography>{new Date(createdAt).toLocaleString("vi-VN")}</Typography>
			),
		},
		{
			title: "Action",
			align: "center",
			width: "13%",

			render: (_text: any, record: Recipe) => (
				<Flex justify="center" className="space-x-3">
					<Button
						type="default"
						style={{
							backgroundColor: !record.isVerified ? AppColor.greenColor : "inherit",
							color: !record.isVerified ? "white" : "#ccc",
						}}
						onClick={() => {
							ConfirmModal({
								content: "Are you sure to public this recipe?",
								onOk: () => {
									handleVerifyRecipe({ recipe: record, status: ActionStatus.ACCEPTED });
								},
							});
						}}
						disabled={record.isVerified}
					>
						Accept
					</Button>
					<Button
						type="default"
						style={{
							backgroundColor: !record.isVerified ? AppColor.redColor : "inherit",
							color: !record.isVerified ? "white" : "#ccc",
						}}
						className=""
						onClick={() =>
							ConfirmModal({
								content: "Are you sure to not public this recipe?",
								onOk: () => {
									handleVerifyRecipe({ recipe: record, status: ActionStatus.REJECTED });
								},
							})
						}
						disabled={record.isVerified}
					>
						Reject
					</Button>
				</Flex>
			),
		},
		{
			title: "",
			align: "center",
			width: "13%",

			render: (_text: any, record: Recipe) => (
				<Flex justify="center" className="space-x-1">
					<Tooltip title="View Detail">
						<Button
							href={`/recipes/${record.id}`}
							type="text"
							icon={<EyeOutlined className="text-primary" style={{ fontSize: "16px" }} />}
						/>
					</Tooltip>
					<Tooltip title="Remove Recipe">
						<Button
							type="text"
							icon={<DeleteOutlined className="text-primary" style={{ fontSize: "16px" }} />}
							onClick={() =>
								ConfirmModal({
									content: "Are you want to remove this recipe ?",
									onOk: () => handleDeleteRecipe(record.id),
								})
							}
						/>
					</Tooltip>
				</Flex>
			),
		},
	];

	return (
		<div className="flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">Recipe Management</h2>

			<Flex className="mb-4 w-full" align="center" justify="space-between">
				<Flex align="center" className="space-x-3">
					<Typography.Text>Search </Typography.Text>
					<span>
						<Input
							type="text"
							size="small"
							placeholder="Search recipes by title ..."
							className="focus:border-blue-500 rounded-md border-gray-300 px-3 py-1 focus:outline-none"
							onChange={(e) => handleSearchTitle(e.target.value)}
						/>
					</span>
				</Flex>
				<PaginationPageSize
					options={[5, 10, 15]}
					pageSize={pageSize}
					setPageSize={setPageSize}
				></PaginationPageSize>
			</Flex>
			<PaginationTable columns={columns} dataSource={listRecipes} pageSize={pageSize} />
		</div>
	);
}

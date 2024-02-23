import { useGetRecipeById } from "@/hooks/useGetRecipeById";
import { CreateRecipeDTO, Ingredients, Instructors } from "@/types/recipe";
import { Roles } from "@/types/user";
import { MultiImagesUploadComponent } from "@/ui/components";
import DraggerUpload from "@/ui/components/DraggerUpload";
import AppColor from "@/utils/appColor";
import { AppConstant } from "@/utils/constant";
import { showToast } from "@/utils/notify";
import { categoriesStore } from "@/zustand/category.store";
import fileStore from "@/zustand/file.store";
import { useLoadingStore } from "@/zustand/loading.store";
import { recipeStore } from "@/zustand/recipe.store";
import userStore from "@/zustand/user.store";
import {
	CaretUpFilled,
	CaretDownOutlined,
	DeleteOutlined,
	CameraOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Rate, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, FieldArray, Formik, FormikErrors } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const createRecipeValidationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	portion: Yup.number()
		.required("Portion is required")
		.min(1, "Portion must be greater than 0")
		.max(999, "Portion must be less than 999"),
	cookingTime: Yup.number()
		.required("Cooking time is required")
		.min(1, "Cooking time must be greater than 0")
		.max(999, "Cooking time must be less than 999"),
	price: Yup.number().required("Price is required").min(1, "Price must be greater than 0"),
	categories: Yup.array()
		.required("Categories is required")
		.min(1, "Recipe must be have at least one category"),
	ratings: Yup.number().required("Ratings is required"),
	ingredients: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required("Ingredient name is required"),
			amount: Yup.string().required("Ingredient amount is required"),
		})
	),
	instructors: Yup.array().of(
		Yup.object().shape({
			description: Yup.string().required("Step description is required"),
		})
	),
});

export default function CreateRecipePage() {
	// State
	const [isPreviewVisible, setPreviewVisible] = useState(false);
	const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
	const [isConfirmLoading, setConfirmLoading] = useState(false);
	// Zustand store
	const { categories } = categoriesStore((state) => state);
	const { createRecipe } = recipeStore((state) => state);
	const { uploadImage } = fileStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const { user } = userStore((state) => state);
	// Controller
	const handleCreateRecipe = async (value: CreateRecipeDTO) => {
		setLoading(true);
		const response = await createRecipe(value);
		if (response.isSuccess) {
			showToast("success", "Create recipe successfully");
		} else {
			showToast("error", "Create recipe failed");
		}
		setLoading(false);
	};

	const handleUploadImage = async (file: File): Promise<string | null> => {
		const response = await uploadImage(file, AppConstant.recipeFolder);
		if (response.isSuccess) {
			return response.data;
		}
		return null;
	};

	// Hooks
	const { recipeId } = useParams();
	const { recipe } = useGetRecipeById(recipeId);
	return (
		<div className="flex w-full justify-center">
			<Formik
				initialValues={{
					thumbnailUrl: recipe?.thumbnailUrl ?? "",
					title: recipe?.title ?? "",
					description: recipe?.description ?? "",
					portion: recipe?.portion ?? 0,
					cookingTime: recipe?.cookingTime ?? 0,
					isPrivate: recipe?.isPrivate ?? false,
					price: recipe?.price ?? 0,
					ratings: recipe?.ratings ?? 0,
					categories: recipe?.categories ?? [],
					ingredients: recipe?.ingredients ?? [
						{
							name: "",
							amount: "",
						},
						{
							name: "",
							amount: "",
						},
					],
					instructors:
						recipe?.instructors ??
						([
							{
								instructorOrder: 0,
								imageUrls: [] as string[],
								description: "",
							},
							{
								instructorOrder: 1,
								imageUrls: [] as string[],
								description: "",
							},
						] as Instructors[]),
				}}
				onSubmit={handleCreateRecipe}
				validationSchema={createRecipeValidationSchema}
				isInitialValid={false}
			>
				{({
					values,
					getFieldProps,
					errors,
					touched,
					handleSubmit,
					handleBlur,
					handleChange,
					setFieldValue,
					isValid,
				}) => (
					<Form onFinish={handleSubmit} className="space-y-2">
						<div className="mb-5">
							<Form.Item name={"thumbnailUrl"}>
								{!values.thumbnailUrl ? (
									<DraggerUpload
										icon={<CameraOutlined className="text-5xl text-gray-400" />}
										title={"Upload recipe photo"}
										showUploadList={false}
										description="After investing time and creativity in your dish, show it off. Let others admire your culinary skills and the delicious dish you've created. You might inspire them to cook too!"
										onChange={async (info) => {
											let isUploading = false;
											let i = 0;
											if (info.file.status === "error") {
												showToast("error", "Upload images failed");
												return;
											}

											if (info.file.status === "uploading" && !isUploading) {
												i++;
												console.log(i);
												isUploading = true;
												showToast("info", "Uploading image...");
												return;
											}
											if (info.file.status === "done") {
												const imageURL = await handleUploadImage(info.file.originFileObj as File);
												if (imageURL != null) {
													setFieldValue(`thumbnailUrl`, imageURL);
													showToast("success", "Upload image successfully");
												}
											}
										}}
									></DraggerUpload>
								) : (
									<>
										<div className="relative text-center">
											<img className="" src={values.thumbnailUrl}></img>
											<div className="absolute bottom-0 right-0 bg-gray-500 px-1 text-3xl text-white">
												<EyeOutlined
													className="border-r-1 border border-b-0 border-l-0 border-t-0 p-1 hover:cursor-pointer"
													onClick={() => setPreviewVisible(true)}
												></EyeOutlined>
												<DeleteOutlined
													className="p-1 hover:cursor-pointer"
													onClick={() => setOpenConfirmDeleteModal(true)}
												></DeleteOutlined>
											</div>
										</div>
										<Modal
											title={
												<Typography.Title className="text-center" level={3}>
													Warning !
												</Typography.Title>
											}
											open={isOpenConfirmDeleteModal}
											centered
											onCancel={() => setOpenConfirmDeleteModal(false)}
											okButtonProps={{
												className: `!bg-[${AppColor.deepOrangeColor}]`,
												style: { backgroundColor: AppColor.deepOrangeColor },
											}}
											onOk={() => {
												setConfirmLoading(true);
												setTimeout(() => {
													setConfirmLoading(false);
													setOpenConfirmDeleteModal(false);
													setFieldValue("thumbnailUrl", "");
												}, 1000);
											}}
											okText="Confirm"
											cancelText="Cancel"
											confirmLoading={isConfirmLoading}
										>
											<div className="text-center">
												<Typography>Are you sure you want to delete this image?</Typography>
											</div>
										</Modal>
										<Modal
											open={isPreviewVisible}
											onCancel={() => setPreviewVisible(false)}
											footer={null}
											width={1000}
										>
											<img src={values.thumbnailUrl} alt="Thumbnail" style={{ width: "100%" }} />
										</Modal>
									</>
								)}
							</Form.Item>
						</div>
						<div className="space-y-5 bg-gray-50 p-6">
							<Form.Item name="title">
								<Input
									className="w-full rounded-md border border-gray-300 px-4"
									type="text"
									name="title"
									defaultValue={values.title}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Title: My eggs!"
								/>
								{errors.title && touched.title && (
									<Typography className="ms-1 mt-2 text-red-500">{errors.title}</Typography>
								)}
							</Form.Item>
							<Form.Item name="description">
								<TextArea
									rows={4}
									className="w-full rounded-md border border-gray-300 px-4"
									name="description"
									onChange={handleChange}
									onBlur={handleBlur}
									defaultValue={values.description}
									placeholder="Share a little more about this dish. What or who inspired you to cook it? What makes it special to you? What's your favourite way to eat it? What do you like to serve it with?"
								/>
								{errors.description && touched.description && (
									<Typography className="ms-1 mt-2 text-red-500">{errors.description}</Typography>
								)}
							</Form.Item>
							<Form.Item name="portion" extra="How many people does this recipe serve?">
								<div className="flex items-center">
									<Typography.Title level={5} className="basis-1/2">
										Portion
									</Typography.Title>
									<div className="w-full">
										<Input
											className="w-full rounded-md border border-gray-300 px-4"
											type="number"
											defaultValue={values.portion}
											{...getFieldProps("portion")}
										/>
										{errors.portion && touched.portion && (
											<Typography className="ms-1 mt-2 text-red-500">{errors.portion}</Typography>
										)}
									</div>
								</div>
							</Form.Item>
							<Form.Item name="cookingTime" extra="How long does it take to prepare this recipe?">
								<div className="flex items-center">
									<Typography.Title level={5} className="basis-1/2">
										Cooking Time
									</Typography.Title>
									<div className="w-full">
										<Input
											className="w-full rounded-md border border-gray-300 px-4"
											type="number"
											defaultValue={values.cookingTime}
											{...getFieldProps("cookingTime")}
											placeholder="Title: My eggs!"
										/>
										{errors.cookingTime && touched.cookingTime && (
											<Typography className="ms-1 mt-2 text-red-500">
												{errors.cookingTime}
											</Typography>
										)}
									</div>
								</div>
							</Form.Item>
							{user?.role == Roles.CHEF && (
								<>
									<Form.Item name="isPrivate">
										<div className="flex items-center">
											<Typography.Title level={5} className="!mb-0 basis-1/2">
												Private
											</Typography.Title>
											<div className="w-full">
												<Radio.Group
													optionType="button"
													name="isPrivate"
													defaultValue={values.isPrivate}
													onChange={(e) => setFieldValue("isPrivate", e.target.value)}
													onBlur={handleBlur}
												>
													<Radio.Button value={true}>Yes</Radio.Button>
													<Radio.Button value={false}>No</Radio.Button>
												</Radio.Group>
											</div>
										</div>
									</Form.Item>
									<Form.Item name="price">
										<div className="flex items-center">
											<Typography.Title level={5} className="!mb-0 basis-1/2">
												Price
											</Typography.Title>
											<div className="w-full">
												<Input
													type="number"
													{...getFieldProps("price")}
													className="w-full rounded-md border border-gray-300"
													defaultValue={values.price}
													placeholder="100"
												/>
												{errors.price && touched.price && (
													<Typography className="ms-1 mt-2 text-red-500">{errors.price}</Typography>
												)}
											</div>
										</div>
									</Form.Item>
								</>
							)}

							<Form.Item name="ratings">
								<div className="flex items-center">
									<Typography.Title level={5} className="!mb-0 basis-1/2">
										Difficult
									</Typography.Title>
									<div className="w-full">
										<Rate
											style={{ color: AppColor.deepOrangeColor }}
											defaultValue={values.ratings}
											allowHalf
											allowClear
											onChange={(value) => setFieldValue("ratings", value)}
										/>
										{errors.ratings && touched.ratings && (
											<Typography className="ms-1 mt-2 text-red-500">{errors.ratings}</Typography>
										)}
									</div>
								</div>
							</Form.Item>
							<Form.Item name="categories">
								<div className="flex items-center">
									<Typography.Title level={5} className="!mb-0 basis-1/2">
										Price
									</Typography.Title>
									<div className="w-full">
										<Select
											mode="multiple"
											allowClear
											// style={{ width: "100%" }}
											placeholder="Please select categories"
											defaultValue={values.categories}
											onChange={(e) => setFieldValue("categories", e)}
											options={categories.map((category) => ({
												label: category.name,
												value: category.id,
											}))}
										/>
										{errors.categories && touched.categories && (
											<Typography className="ms-1 mt-2 text-red-500">
												{errors.categories}
											</Typography>
										)}
									</div>
								</div>
							</Form.Item>
						</div>
						<div className="space-y-3 bg-gray-50 p-6">
							<Typography.Title level={3}>Ingredients</Typography.Title>
							<FieldArray name="ingredients">
								{({ push, move }) => (
									<>
										<div className="space-y-2">
											{values.ingredients.map((_, index) => (
												<Field name={`ingredients.${index}`} key={index}>
													{() => (
														<>
															<div className="flex items-center space-x-2">
																<div className="flex flex-col">
																	{index > 0 && (
																		<CaretUpFilled
																			size={4}
																			className="text-xs"
																			onClick={() => move(index, index - 1)}
																		></CaretUpFilled>
																	)}
																	{index < values.ingredients.length - 1 && (
																		<CaretDownOutlined
																			size={4}
																			className="text-xs"
																			onClick={() => move(index, index + 1)}
																		></CaretDownOutlined>
																	)}
																</div>
																<div className="basis-1/2">
																	<Input
																		className="w-full rounded-md border border-gray-300 px-4"
																		type="text"
																		{...getFieldProps(`ingredients.${index}.name`)}
																		placeholder="Title: My eggs!"
																	/>
																	{errors.ingredients &&
																		errors.ingredients[index] &&
																		touched.ingredients &&
																		touched.ingredients[index] &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>)
																			.name && (
																			<Typography className="ms-1 ms-7 mt-2 text-red-500">
																				{
																					(errors.ingredients[index] as FormikErrors<Ingredients>)
																						.name
																				}
																			</Typography>
																		)}
																</div>

																<div className="basis-1/2">
																	<Input
																		className="w-full rounded-md border border-gray-300 px-4"
																		type="text"
																		{...getFieldProps(`ingredients.${index}.amount`)}
																		placeholder="Title: My eggs!"
																	/>
																	{errors.ingredients &&
																		errors.ingredients[index] &&
																		touched.ingredients &&
																		touched.ingredients[index] &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>)
																			.amount && (
																			<Typography className="ms-1 ms-7 mt-2 text-red-500">
																				{
																					(errors.ingredients[index] as FormikErrors<Ingredients>)
																						.amount
																				}
																			</Typography>
																		)}
																</div>
															</div>
														</>
													)}
												</Field>
											))}
										</div>
										<div className="text-center">
											<Button type="text">
												<Typography
													className="text-sky-500 text-xl font-semibold"
													onClick={() => push({ name: "", amount: "" })}
												>
													+ Ingredient
												</Typography>
											</Button>
										</div>
									</>
								)}
							</FieldArray>
						</div>
						<div className="space-y-3 bg-gray-50 p-6">
							<Typography.Title level={3}>Instructor</Typography.Title>
							<FieldArray name="instructors">
								{({ push, move, remove }) => (
									<>
										<div className="space-y-2">
											{values.instructors.length &&
												values.instructors.map((_, index) => (
													<div className="relative flex justify-between space-x-2" key={index}>
														<div className="absolute left-0 top-2 flex flex-col items-center">
															<Typography className="mb-2 rounded-full bg-black px-2 text-white">
																{index + 1}
															</Typography>
															{index > 0 && (
																<CaretUpFilled
																	onClick={() => move(index, index - 1)}
																	size={4}
																	className="mb-1 text-xs"
																></CaretUpFilled>
															)}
															{index < values.instructors.length - 1 && (
																<CaretDownOutlined
																	onClick={() => move(index, index + 1)}
																	size={4}
																	className="mb-1 text-xs"
																></CaretDownOutlined>
															)}
														</div>

														<div className="!ml-10  w-11/12">
															<div className="flex items-center justify-between">
																<TextArea
																	className="rounded-md border border-gray-300 px-4 py-2"
																	{...getFieldProps(`instructors.${index}.description`)}
																	placeholder="Title: My eggs!"
																/>
																{
																	<DeleteOutlined
																		size={4}
																		className="px-2 py-1"
																		onClick={() => {
																			if (values.instructors.length) remove(index);
																		}}
																	></DeleteOutlined>
																}
															</div>
															{errors.instructors &&
																(errors.instructors[index] as FormikErrors<Instructors>) &&
																(errors.instructors[index] as FormikErrors<Instructors>)
																	.description &&
																touched.instructors?.[index] && (
																	<Typography className="ms-1 mt-2 text-red-500">
																		{
																			(errors.instructors[index] as FormikErrors<Instructors>)
																				.description
																		}
																	</Typography>
																)}
															<MultiImagesUploadComponent
																onChange={async (info) => {
																	if (info.file.status === "error") {
																		showToast("error", "Upload avatar failed");
																		info.fileList = info.fileList.filter(
																			(file) => file.uid !== info.file.uid
																		);
																	}

																	if (info.file.status === "done") {
																		const imageURL = await handleUploadImage(
																			info.file.originFileObj as File
																		);
																		if (imageURL != null) {
																			setFieldValue(`instructors.${index}.imageUrls`, [
																				...values.instructors[index].imageUrls,
																				imageURL,
																			]);
																			showToast("success", "Upload image successfully");
																		}
																	}
																}}
															></MultiImagesUploadComponent>
														</div>
													</div>
												))}
										</div>
										<div className="text-center">
											<Button type="text">
												<Typography
													className="text-sky-500 text-xl font-semibold"
													onClick={() =>
														push({
															instructorOrder: values.instructors.length,
															imageUrls: [] as string[],
															description: "",
														})
													}
												>
													+ Step
												</Typography>
											</Button>
										</div>
									</>
								)}
							</FieldArray>
						</div>
						<div>
							<Form.Item>
								<Button
									htmlType="submit"
									onClick={() => {
										if (!isValid) showToast("error", "Please fill in all fields");
									}}
								>
									Upload
								</Button>
							</Form.Item>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

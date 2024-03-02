import { Roles } from "@/enums";
import { Ingredients, Instructors, UpdateRecipeDTO } from "@/types/recipe";
import { ConfirmModal, MultiImagesUploadComponent } from "@/ui/components";
import DraggerUpload from "@/ui/components/DraggerUpload";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import { categoriesStore } from "@/zustand/category.store";
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
import { Button, Flex, Form, Input, Modal, Radio, Rate, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, FieldArray, Formik, FormikErrors } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../not-found.page";
import { User } from "@/models/user.model";
import { createRecipeValidationSchema } from "@/utils/validation";
import { renderUploadedRequestImage } from "@/utils/file_exts";
import { useGetRecipeById } from "@/hooks/recipes";

export default function UpdateRecipesPage() {
	// Hooks
	const { recipeId } = useParams();
	const { recipe } = useGetRecipeById(recipeId);
	const navigate = useNavigate();

	// State
	const [isPreviewVisible, setPreviewVisible] = useState(false);
	// Zustand store
	const { updateRecipeById } = recipeStore((state) => state);
	const { categories } = categoriesStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const { user } = userStore((state) => state);

	// Controller
	const handleUpdateRecipe = async (value: UpdateRecipeDTO) => {
		setLoading(true);
		const response = await updateRecipeById(recipe?.id as string, value);

		if (response.isSuccess) {
			showToast("success", "Update recipe successfully");
			navigate(`/recipes/${recipe?.id}`);
		} else {
			showToast("error", "Update recipe failed");
		}

		setLoading(false);
	};

	return recipe ? (
		<div className="flex w-full justify-center">
			<Formik
				initialValues={{
					thumbnailUrl: recipe.thumbnailUrl,
					title: recipe.title,
					description: recipe.description,
					portion: recipe.portion,
					cookingTime: recipe.cookingTime,
					isPrivate: recipe.isPrivate,
					price: recipe.price,
					difficult: recipe.difficult,
					categories: recipe.categories.map((category) => category.id),
					ingredients: recipe.ingredients,
					instructors: recipe.instructors,
				}}
				enableReinitialize={true}
				onSubmit={handleUpdateRecipe}
				validationSchema={() => createRecipeValidationSchema(user as User)}
				validateOnChange={true}
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
					<Form onFinish={handleSubmit} className="space-y-2 sm:w-2/3">
						<div className="mb-5">
							<Form.Item name={"thumbnailUrl"}>
								{!values.thumbnailUrl ? (
									<DraggerUpload
										icon={<CameraOutlined className="text-5xl text-gray-400" />}
										title={"Upload recipe photo"}
										showUploadList={false}
										description="After investing time and creativity in your dish, show it off. Let others admire your culinary skills and the delicious dish you've created. You might inspire them to cook too!"
										onChange={async (info) => {
											if (info.file.status === "done") {
												const imageURL = info.file.response;
												if (imageURL != null) {
													setFieldValue(`thumbnailUrl`, imageURL);
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
													onClick={() =>
														ConfirmModal({
															content: "Are you sure you want to delete this image?",
															onOk: () => setFieldValue("thumbnailUrl", ""),
														})
													}
												></DeleteOutlined>
											</div>
										</div>
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
											{...getFieldProps("portion")}
										/>
										{errors.portion && touched.portion && (
											<Typography className="ms-1 mt-2 text-red-500">{errors.portion}</Typography>
										)}
									</div>
								</div>
							</Form.Item>
							<Form.Item
								name="cookingTime"
								extra="How long does it take to prepare this recipe? (time is minutes)
"
							>
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
											placeholder="Cooking Time ..."
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

							<Form.Item name="difficult">
								<div className="flex items-center">
									<Typography.Title level={5} className="!mb-0 basis-1/2">
										Difficult
									</Typography.Title>
									<div className="w-full">
										<Rate
											style={{ color: AppColor.deepOrangeColor }}
											defaultValue={values.difficult}
											allowHalf
											allowClear
											onChange={(value) => setFieldValue("difficult", value)}
										/>
										{errors.difficult && touched.difficult && (
											<Typography className="ms-1 mt-2 text-red-500">{errors.difficult}</Typography>
										)}
									</div>
								</div>
							</Form.Item>
							<Form.Item name="categories">
								<div className="flex items-center">
									<Typography.Title level={5} className="!mb-0 basis-1/2">
										Categories
									</Typography.Title>
									<div className="w-full">
										<Select
											mode="multiple"
											allowClear
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
								{({ push, move, remove }) => (
									<>
										<div className="space-y-2">
											{values.ingredients.map((_, index) => (
												<Field name={`ingredients.${index}`} key={index}>
													{() => (
														<>
															<div className="flex items-start space-x-2">
																<div className="mt-3 flex flex-col">
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
																		placeholder="100ml"
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
																	<Flex align="center">
																		<Input
																			className="w-full rounded-md border border-gray-300 px-4"
																			type="text"
																			{...getFieldProps(`ingredients.${index}.amount`)}
																			placeholder="Title: My eggs!"
																		/>
																		<DeleteOutlined
																			size={4}
																			className="px-2 py-1"
																			onClick={() => {
																				if (values.ingredients.length) remove(index);
																			}}
																		></DeleteOutlined>
																	</Flex>
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
																	placeholder="Boil water"
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
																defaultFileList={renderUploadedRequestImage(
																	values.instructors[index].imageUrls
																)}
																onChange={async (info) => {
																	if (info.file.status === "error") {
																		info.fileList = info.fileList.filter(
																			(file) => file.uid !== info.file.uid
																		);
																		return;
																	}

																	if (info.file.status === "done") {
																		const imageURL = info.file.response;
																		if (imageURL != null) {
																			const updatedInstructors = [...values.instructors];
																			updatedInstructors[index].imageUrls = [
																				...updatedInstructors[index].imageUrls,
																				imageURL,
																			];
																			setFieldValue("instructors", updatedInstructors);
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
								<button
									className="bg-primary w-1/2 rounded-lg p-2 text-white"
									type="submit"
									onClick={() => {
										if (!isValid) showToast("error", "Please fill in all fields");
									}}
								>
									Upload
								</button>
							</Form.Item>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	) : (
		<NotFound></NotFound>
	);
}

import { Roles } from "@/enums";
import { User } from "@/models/user.model";
import { CreateRecipeDTO, Ingredients, Instructors } from "@/types/recipe";
import { ConfirmModal, MultiImagesUploadComponent } from "@/ui/components";
import DraggerUpload from "@/ui/components/DraggerUpload";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import { createRecipeValidationSchema } from "@/utils/validation";
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
import { Button, Col, Flex, Form, Input, Modal, Radio, Rate, Row, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, FieldArray, Formik, FormikErrors } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRecipePage() {
	const navigator = useNavigate();
	// State
	const [isPreviewVisible, setPreviewVisible] = useState(false);
	// Zustand store
	const { categories } = categoriesStore((state) => state);
	const { createRecipe } = recipeStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const { user } = userStore((state) => state);
	console.log(user);
	// Controller
	const handleCreateRecipe = async (value: CreateRecipeDTO) => {
		setLoading(true);
		console.log(value);
		const response = await createRecipe(value);
		if (response.isSuccess) {
			showToast("success", "Create recipe successfully");
			navigator(`/recipes/${response.data.id}`);
		} else {
			showToast("error", "Create recipe failed");
		}
		setLoading(false);
	};

	// Hooks

	return (
		<div className="flex w-full justify-center">
			<Formik
				initialValues={{
					thumbnailUrl: "",
					title: "",
					description: "",
					portion: 0,
					cookingTime: 0,
					isPrivate: false,
					recipePrice: 0,
					isAvailableForBooking: false,
					bookingPrice: 0,
					difficult: 0,
					categories: [],
					ingredients: [
						{
							name: "",
							amount: "",
						},
					],
					instructors: [
						{
							instructorOrder: 0,
							imageUrls: [] as string[],
							description: "",
						},
					] as Instructors[],
				}}
				onSubmit={handleCreateRecipe}
				validationSchema={() => createRecipeValidationSchema(user as User)}
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
					<Form onFinish={handleSubmit} className="w-full space-y-2" layout="vertical">
						<div className="mb-5">
							<Form.Item name={"thumbnailUrl"}>
								{!values.thumbnailUrl ? (
									<>
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
										{errors.thumbnailUrl && (
											<Typography className="ms-1 mt-2 text-red-500">
												{errors.thumbnailUrl}
											</Typography>
										)}
									</>
								) : (
									<>
										<div className="relative text-center">
											<img className="w-full object-cover" src={values.thumbnailUrl}></img>
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
											defaultValue={values.portion}
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
								extra="How long does it take to prepare this recipe? (time is minutes)"
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
											placeholder="Cooking Time..."
										/>
										{errors.cookingTime && touched.cookingTime && (
											<Typography className="ms-1 mt-2 text-red-500">
												{errors.cookingTime}
											</Typography>
										)}
									</div>
								</div>
							</Form.Item>
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
										Category
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
											filterOption={(input, option) =>
												option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
											}
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

						{user?.role == Roles.CHEF && (
							<div className="space-y-1 bg-gray-50 p-6">
								<Typography.Title level={3}>For Chef:</Typography.Title>
								<Row>
									<Col span={12}>
										<Form.Item name="isPrivate">
											<div className="flex items-center">
												<Typography.Title level={5} className="!mb-0 basis-1/2">
													Private For Pay
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
									</Col>
									<Col span={12}>
										<Form.Item name="recipePrice">
											<div className="flex items-start">
												<Typography.Title level={5} className="!mb-0 mt-2 basis-1/2">
													Price
												</Typography.Title>
												<div className="w-full">
													<Input
														type="number"
														{...getFieldProps("recipePrice")}
														className="w-full rounded-md border border-gray-300"
														defaultValue={values.recipePrice}
														placeholder="100"
														disabled={!values.isPrivate}
													/>
													{errors.recipePrice && touched.recipePrice && (
														<Typography className="ms-1 mt-2 text-red-500">
															{errors.recipePrice}
														</Typography>
													)}
												</div>
											</div>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={12}>
										<Form.Item name="isAvailableForBooking">
											<div className="flex items-center">
												<Typography.Title level={5} className="!mb-0 basis-1/2">
													Available For Booking:
												</Typography.Title>
												<div className="w-full">
													<Radio.Group
														optionType="button"
														name="isAvailableForBooking"
														defaultValue={values.isAvailableForBooking}
														onChange={(e) => setFieldValue("isAvailableForBooking", e.target.value)}
														onBlur={handleBlur}
													>
														<Radio.Button value={true}>Yes</Radio.Button>
														<Radio.Button value={false}>No</Radio.Button>
													</Radio.Group>
												</div>
											</div>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item name="bookingPrice">
											<div className="flex items-start">
												<Typography.Title level={5} className="!mb-0 mt-2 basis-1/2">
													Booking Price
												</Typography.Title>
												<div className="w-full">
													<Input
														type="number"
														{...getFieldProps("bookingPrice")}
														className="w-full rounded-md border border-gray-300"
														defaultValue={values.bookingPrice}
														placeholder="100"
														disabled={!values.isAvailableForBooking}
													/>
													{errors.bookingPrice && touched.bookingPrice && (
														<Typography className="ms-1 mt-2 text-red-500">
															{errors.bookingPrice}
														</Typography>
													)}
												</div>
											</div>
										</Form.Item>
									</Col>
								</Row>
							</div>
						)}
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
																<div className="mt-10 flex flex-col">
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
																	<Form.Item
																		label="Ingredient amount: "
																		required
																		className="mb-0 w-full"
																	>
																		<Input
																			className="w-full rounded-md border border-gray-300 px-4"
																			type="text"
																			{...getFieldProps(`ingredients.${index}.amount`)}
																			placeholder="100 ml"
																		/>
																	</Form.Item>

																	{errors.ingredients &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>) &&
																		touched.ingredients &&
																		(touched.ingredients[index] as FormikErrors<Ingredients>) &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>)
																			.amount &&
																		(touched.ingredients[index] as FormikErrors<Ingredients>)
																			.amount && (
																			<Typography className="ms-1 ms-7 mt-2 text-red-500">
																				{
																					(errors.ingredients[index] as FormikErrors<Ingredients>)
																						.amount
																				}
																			</Typography>
																		)}
																</div>

																<div className="basis-1/2">
																	<Flex align="center">
																		<Form.Item
																			label="Ingredient name: "
																			required
																			className="mb-0 w-full"
																		>
																			<Input
																				className="w-full rounded-md border border-gray-300 px-4"
																				type="text"
																				{...getFieldProps(`ingredients.${index}.name`)}
																				placeholder="water"
																			/>
																		</Form.Item>

																		<DeleteOutlined
																			size={4}
																			className="mt-7 px-2 py-1"
																			onClick={() => {
																				if (values.ingredients.length) remove(index);
																			}}
																		></DeleteOutlined>
																	</Flex>

																	{errors.ingredients &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>) &&
																		touched.ingredients &&
																		(touched.ingredients[index] as FormikErrors<Ingredients>) &&
																		(errors.ingredients[index] as FormikErrors<Ingredients>).name &&
																		(touched.ingredients[index] as FormikErrors<Ingredients>)
																			.name && (
																			<Typography className="ms-1 ms-7 mt-2 text-red-500">
																				{
																					(errors.ingredients[index] as FormikErrors<Ingredients>)
																						.name
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
													<div className="relative flex w-full space-x-2" key={index}>
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

														<div className="!ml-10 w-full">
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
						<div className="pt-4 text-center">
							<Form.Item>
								<button
									className="bg-primary w-1/2 rounded-lg p-2 text-white"
									type="submit"
									onClick={() => {
										console.log(values);
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
	);
}

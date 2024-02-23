import { BecomeChefRequest } from "@/models/become-chef-request.model";
import { UploadButton } from "@/ui/components";
import AppColor from "@/utils/appColor";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { showToast } from "@/utils/notify";
import { generateRandomString } from "@/utils/string.extension";
import { becomeChefRequestStore } from "@/zustand/become-chef-request";
import { categoriesStore } from "@/zustand/category.store";
import fileStore from "@/zustand/file.store";
import { Col, DatePicker, Form, Input, Modal, Row, Select, Typography, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

dayjs.extend(customParseFormat);

interface CreateRequestModalProps {
	open: boolean;
	onClick: (status: boolean) => void;
	request?: BecomeChefRequest;
}
const becomeChefRequestValidator = Yup.object().shape({
	identityImageUrl: Yup.string().required("This field is required"),
	certificateImageUrls: Yup.array().required("This field is required"),
	fullName: Yup.string().required("This field is required"),
	phoneNumber: Yup.string()
		.matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, "Phone number is invalid")
		.required("This field is required"),
	email: Yup.string().email("Invalid email format").required("This field is required"),
	gender: Yup.string().required("This field is required"),
	address: Yup.string().required("This field is required"),
	dob: Yup.date().required("This field is required").typeError("Invalid date format"),
	category: Yup.string().required("This field is required"),
	achievement: Yup.string().required("This field is required"),
	experience: Yup.string().required("This field is required"),
});

const dateFormat = "DD-MM-YYYY";

const renderUploadedRequestImage = (imageUrls: string[] | undefined): UploadFile[] => {
	if (!imageUrls) {
		return [];
	} else {
		return imageUrls.map((imageUrl) => ({
			uid: generateRandomString(10),
			name: imageUrl,
			status: "done",
			url: imageUrl,
		}));
	}
};
export default function CreateRequestModal({ open, onClick, request }: CreateRequestModalProps) {
	const [listCertificateImages, setListCertificateImages] = useState<UploadFile[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { uploadImage } = fileStore((state) => state);
	const { createBecomeChefRequest, updateRequestById } = becomeChefRequestStore((state) => state);
	const { categories } = categoriesStore((state) => state);

	const formik = useFormik({
		initialValues: {
			identityImageUrl: "",
			certificateImageUrls: [""],
			fullName: "",
			phoneNumber: "",
			email: "",
			gender: "",
			address: "",
			dob: new Date(),
			category: "",
			achievement: "",
			experience: "",
		},
		onSubmit: () => {
			console.log(true);
		},
		validateOnChange: true,
		validationSchema: becomeChefRequestValidator,
		validateOnMount: true,
	});

	useEffect(() => {
		// Update form values when the request prop changes
		if (request) {
			formik.setValues({
				identityImageUrl: request.identityImageUrl,
				certificateImageUrls: request.certificateImageUrls,
				fullName: request.fullName,
				phoneNumber: request.phoneNumber,
				email: request.email,
				gender: request.gender,
				address: request.address,
				dob: new Date(request.dob),
				category: request.category,
				achievement: request.achievement,
				experience: request.experience,
			});
			setListCertificateImages(renderUploadedRequestImage(request.certificateImageUrls));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request]);
	const handleChangeImage = async (
		info: UploadChangeParam<UploadFile<any>>
	): Promise<string | null> => {
		const file = info.file.originFileObj;

		const response = await uploadImage(file as File, "become-chef-request");
		if (response.isSuccess) {
			return response.data;
		}
		return null;
	};

	const handleSubmitForm = async () => {
		let response: any = null;

		if (request) {
			showToast("info", "Updating ...");
			response = await updateRequestById(request.requestChefId, formik.values);
		} else {
			showToast("info", "Creating ...");
			response = await createBecomeChefRequest(formik.values);
		}

		setTimeout(() => {
			if (response.isSuccess) {
				showToast("success", response.message!);
				window.location.reload();
			} else {
				showToast("error", response.message!);
			}
		}, 1000);
	};
	return (
		<Modal
			width={1000}
			open={open}
			onOk={async () => {
				if (formik.isValid) {
					handleSubmitForm();
				} else {
					showToast("error", "Please fill all required fields");
				}
			}}
			onCancel={() => onClick(false)}
			okButtonProps={{
				htmlType: "submit",
				className: `!bg-[${AppColor.deepOrangeColor}]`,
				style: { backgroundColor: AppColor.deepOrangeColor },
			}}
		>
			<Typography.Title level={3} className="text-center">
				Chef Application Form
			</Typography.Title>
			<Form onFinish={formik.handleSubmit} className="flex flex-col sm:flex-row">
				<Col span={5} xs={24} md={5}>
					<Form.Item
						hasFeedback
						name="identityImageUrl"
						className="mt-2"
						required
						validateStatus={formik.errors.identityImageUrl ? "error" : "success"}
						help={
							formik.errors.identityImageUrl &&
							formik.touched.identityImageUrl && (
								<div className="mt-1 text-red-500">{formik.errors.identityImageUrl as string}</div>
							)
						}
					>
						<Typography.Title level={5}>
							<Typography.Text style={{ color: "red" }}>*</Typography.Text> Identity Image
						</Typography.Title>
						<Upload
							name="identityImageUrl"
							listType="picture-card"
							className="avatar-uploader mt-2 text-center"
							showUploadList={false}
							action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
							beforeUpload={handleBeforeUploadFile}
							onChange={async (info) => {
								setLoading(true);
								const imageURL = await handleChangeImage(info);
								if (imageURL !== null) {
									formik.setFieldValue("identityImageUrl", imageURL);
								}
								setLoading(false);
							}}
						>
							{formik.values.identityImageUrl ? (
								<img src={formik.values.identityImageUrl} alt="avatar" style={{ width: "100%" }} />
							) : (
								<UploadButton loading={loading}></UploadButton>
							)}
						</Upload>
					</Form.Item>

					<Form.Item
						hasFeedback
						name="certificateImageUrls"
						className="mt-2"
						required
						validateStatus={formik.errors.certificateImageUrls ? "error" : "success"}
						help={
							formik.errors.certificateImageUrls &&
							formik.touched.certificateImageUrls && (
								<div className="mt-1 text-red-500">
									{formik.errors.certificateImageUrls as string}
								</div>
							)
						}
					>
						<Typography.Title level={5}>
							<Typography.Text style={{ color: "red" }}>*</Typography.Text> Certificate Image
						</Typography.Title>
						<Upload
							className="mt-2 text-center"
							listType="picture-card"
							fileList={listCertificateImages}
							action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
							beforeUpload={handleBeforeUploadFile}
							onChange={async (info) => {
								let currentFileList = info.fileList;

								if (
									info.file.status === "error" ||
									!handleBeforeUploadFile(info.file.originFileObj as RcFile)
								) {
									showToast("error", "Upload avatar failed");
									currentFileList = currentFileList.filter((file) => file.uid !== info.file.uid);
								}

								setListCertificateImages(currentFileList);

								if (info.file.status === "done") {
									const imageURL = await handleChangeImage(info);
									if (imageURL != null) {
										formik.setFieldValue("certificateImageUrls", [
											...formik.values.certificateImageUrls,
											imageURL,
										]);
										info.file.url = imageURL;
										showToast("success", "Upload image successfully");
									}
								}
							}}
							onRemove={(file) => {
								// Handle removal from formik values
								const updatedCertificateImageUrls = formik.values.certificateImageUrls.filter(
									(url) => url !== file.url
								);
								formik.setFieldValue("certificateImageUrls", updatedCertificateImageUrls);

								// Handle removal from fileList state
								const updatedFileList = listCertificateImages.filter(
									(listFile) => listFile.uid !== file.uid
								);
								setListCertificateImages(updatedFileList);
							}}
						>
							<UploadButton></UploadButton>
						</Upload>

						{formik.errors.certificateImageUrls && formik.touched.certificateImageUrls && (
							<div className="mt-1 text-red-500">
								{formik.errors.certificateImageUrls as string}
							</div>
						)}
					</Form.Item>
				</Col>
				<Col span={15} xs={24} md={{ span: 15, offset: 2 }}>
					<Row className="text-center">
						<Col span={11} xs={24} md={11}>
							<Form.Item
								hasFeedback
								name="fullName"
								className="mt-2"
								label="Full name"
								required
								validateStatus={formik.errors.fullName ? "error" : "success"}
								help={
									formik.errors.fullName &&
									formik.touched.fullName && (
										<div className="mt-1 text-red-500">{formik.errors.fullName as string}</div>
									)
								}
							>
								<Input
									id="fullName"
									name="fullName"
									type="text"
									defaultValue={formik.values.fullName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="small"
									required
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Full name"
								/>
							</Form.Item>
						</Col>
						<Col span={11} xs={24} md={{ span: 12, offset: 1 }}>
							<Form.Item
								hasFeedback
								name="phoneNumber"
								className="mt-2"
								label="Phone number"
								required
								validateStatus={formik.errors.phoneNumber ? "error" : "success"}
								help={
									formik.errors.phoneNumber &&
									formik.touched.phoneNumber && (
										<div className="mt-1 text-red-500">{formik.errors.phoneNumber as string}</div>
									)
								}
							>
								<Input
									id="phoneNumber"
									name="phoneNumber"
									type="text"
									defaultValue={formik.values.phoneNumber}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									required
									size="small"
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Phone number"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="text-center">
						<Col span={11} xs={24} md={11}>
							<Form.Item
								hasFeedback
								name="gender"
								className="mt-2"
								label="Gender"
								required
								validateStatus={formik.errors.gender ? "error" : "success"}
								help={
									formik.errors.gender &&
									formik.touched.gender && (
										<div className="mt-1 text-red-500">{formik.errors.gender as string}</div>
									)
								}
							>
								<Select
									size="small"
									defaultValue={formik.values.gender}
									onChange={(value) => {
										formik.setFieldValue("gender", value);
									}}
									onBlur={formik.handleBlur}
									options={[
										{ value: "Female", label: "Female" },
										{ value: "Male", label: "Male" },
									]}
								/>
							</Form.Item>
						</Col>
						<Col span={11} xs={24} md={{ span: 12, offset: 1 }}>
							<Form.Item
								hasFeedback
								name="address"
								className="mt-2"
								label="Address"
								required
								validateStatus={formik.errors.address ? "error" : "success"}
								help={
									formik.errors.address &&
									formik.touched.address && (
										<div className="mt-1 text-red-500">{formik.errors.address as string}</div>
									)
								}
							>
								<Input
									id="address"
									name="address"
									type="text"
									defaultValue={formik.values.address}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									required
									size="small"
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Address"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="text-center">
						<Col span={11} xs={24} md={11}>
							<Form.Item
								hasFeedback
								name="dob"
								className="mt-2"
								label="Date of Birth"
								required
								validateStatus={formik.errors.dob ? "error" : "success"}
								help={
									formik.errors.dob &&
									formik.touched.dob && (
										<div className="mt-1 text-red-500">{formik.errors.dob as string}</div>
									)
								}
							>
								<DatePicker
									name="dob"
									maxDate={dayjs(Date.now(), dateFormat)}
									onChange={(date) => {
										formik.setFieldValue("dob", date);
									}}
									defaultValue={dayjs(formik.values.dob)}
									format={dateFormat}
									onBlur={formik.handleBlur}
									size="small"
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Date of birth"
								/>
							</Form.Item>
						</Col>
						<Col span={11} xs={24} md={{ span: 12, offset: 1 }}>
							<Form.Item
								hasFeedback
								name="category"
								className="mt-2"
								label="Specilized"
								required
								validateStatus={formik.errors.category ? "error" : "success"}
								help={
									formik.errors.category &&
									formik.touched.category && (
										<div className="mt-1 text-red-500">{formik.errors.category as string}</div>
									)
								}
							>
								<Select
									size="small"
									defaultValue={formik.values.category}
									onChange={(value) => {
										formik.setFieldValue("category", value);
									}}
									onBlur={formik.handleBlur}
									options={categories.map((category) => ({
										value: category.name,
										label: category.name,
									}))}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="text-center">
						<Col span={11} xs={24} md={11}>
							<Form.Item
								hasFeedback
								name="email"
								className="mt-2"
								label="Email"
								required
								validateStatus={formik.errors.email ? "error" : "success"}
								help={
									formik.errors.email &&
									formik.touched.email && (
										<div className="mt-1 text-red-500">{formik.errors.email as string}</div>
									)
								}
							>
								<Input
									id="email"
									name="email"
									type="text"
									defaultValue={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									required
									size="small"
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Email"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="text-center">
						<Col span={24}>
							<Form.Item
								hasFeedback
								name="experience"
								className="mt-2"
								label="Experience"
								required
								validateStatus={formik.errors.experience ? "error" : "success"}
								help={
									formik.errors.experience &&
									formik.touched.experience && (
										<div className="mt-1 text-red-500">{formik.errors.experience as string}</div>
									)
								}
							>
								<TextArea
									rows={5}
									defaultValue={formik.values.experience}
									showCount
									maxLength={300}
									onChange={formik.handleChange}
									placeholder="Experience"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="text-center">
						<Col span={24}>
							<Form.Item
								hasFeedback
								name="achievement"
								className="mt-2"
								label="Achivement"
								required
								validateStatus={formik.errors.achievement ? "error" : "success"}
								help={
									formik.errors.achievement &&
									formik.touched.achievement && (
										<div className="mt-1 text-red-500">{formik.errors.achievement as string}</div>
									)
								}
							>
								<TextArea
									rows={5}
									defaultValue={formik.values.achievement}
									showCount
									maxLength={300}
									onChange={formik.handleChange}
									placeholder="Achievement"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Form>
		</Modal>
	);
}

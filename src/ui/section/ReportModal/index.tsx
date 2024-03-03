import { useAuthenticateFeature } from "@/hooks/common";
import { MultiImagesUploadComponent } from "@/ui/components";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import { reportStore } from "@/zustand/report.store";
import { Col, Form, Input, Modal, Row, Select, Typography, UploadFile } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFormik } from "formik";
import * as Yup from "yup";

dayjs.extend(customParseFormat);

const createReportValidationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	content: Yup.string().required("Content is required"),
});

export default function CreateReportModal() {
	const { open, type, targetId, sendReport, setReportModalState } = reportStore((state) => state);

	// Controller
	const handleSubmitForm = useAuthenticateFeature(async () => {
		console.log(formik.values);
		const response = await sendReport({
			content: formik.values.content,
			targetId: targetId,
			type: type,
			title: formik.values.title,
			imageUrls: formik.values.listImageUrls,
		});
		if (response.isSuccess) {
			showToast("success", response.message!);
			setReportModalState({ open: false, targetId: "" });
		} else {
			showToast("error", response.message!);
		}
	});

	const formik = useFormik({
		initialValues: {
			title: "",
			content: "",
			listImageUrls: [] as string[],
		},
		onSubmit: () => {
			console.log(true);
		},
		validateOnChange: true,
		validationSchema: createReportValidationSchema,
		isInitialValid: false,
	});
	return (
		<Modal
			open={open}
			onCancel={() => setReportModalState({ open: false })}
			onOk={async () => {
				if (formik.isValid) {
					handleSubmitForm();
				} else {
					showToast("error", "Please fill all required fields");
				}
			}}
			okButtonProps={{
				htmlType: "submit",
				className: `!bg-[${AppColor.deepOrangeColor}]`,
				style: { backgroundColor: AppColor.deepOrangeColor },
			}}
		>
			<Typography.Title level={3} className="text-center">
				Report
			</Typography.Title>
			<Form onFinish={formik.handleSubmit} className="flex flex-col sm:flex-row">
				<Col>
					<Row className="text-center">
						<Col span={24}>
							<Form.Item
								labelCol={{ span: 5 }}
								labelAlign="left"
								hasFeedback
								name="title"
								className="mt-2"
								label="Title"
								required
								validateStatus={formik.errors.title && formik.touched.title ? "error" : "success"}
								help={
									formik.errors.title &&
									formik.touched.title && (
										<div className="mt-1 text-red-500">{formik.errors.title as string}</div>
									)
								}
							>
								<Input
									{...formik.getFieldProps("title")}
									size="small"
									required
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Title"
								/>
							</Form.Item>
						</Col>

						<Col span={24}>
							<Form.Item
								labelCol={{ span: 5 }}
								hasFeedback
								labelAlign="left"
								name="content"
								className="mt-2"
								label="Reason"
								required
								validateStatus={
									formik.errors.content && formik.touched.content ? "error" : "success"
								}
								help={
									formik.errors.content &&
									formik.touched.content && (
										<div className="mt-1 text-red-500">{formik.errors.content as string}</div>
									)
								}
							>
								<Select
									onChange={(value) => {
										formik.setFieldValue("content", value);
									}}
									size="small"
									className="rounded-md border border-gray-300 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
									placeholder="Select violation type"
								>
									{reportStore.getState().type === "recipe" && (
										<>
											<Select.Option value="Inappropriate Content">
												Inappropriate Content
											</Select.Option>
											<Select.Option value="Plagiarism">Plagiarism</Select.Option>
											{/* Add more recipe-specific options as needed */}
										</>
									)}
									{reportStore.getState().type === "user" && (
										<>
											<Select.Option value="Fake Account">Fake Account</Select.Option>
											<Select.Option value="Harassment">Harassment</Select.Option>
											{/* Add more user-specific options as needed */}
										</>
									)}
									{reportStore.getState().type === "comment" && (
										<>
											<Select.Option value="Offensive Comment">Offensive Comment</Select.Option>
											<Select.Option value="Spam">Spam</Select.Option>
											{/* Add more comment-specific options as needed */}
										</>
									)}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item
						name="listImageUrls"
						label="List Image"
						labelCol={{ span: 5 }}
						labelAlign="left"
					>
						<MultiImagesUploadComponent
							onChange={async (info) => {
								if (info.file.status === "error") {
									info.fileList = info.fileList.filter((file) => file.uid !== info.file.uid);
									return;
								}

								if (info.file.status === "done") {
									const imageURL = info.file.response;
									if (imageURL != null) {
										const updatedImageUrls = [...formik.values.listImageUrls];
										updatedImageUrls.push(imageURL);
										formik.setFieldValue("listImageUrls", updatedImageUrls);
									}
								}
							}}
							onRemove={(file: UploadFile) => {
								const updatedImageUrls = formik.values.listImageUrls.filter(
									(url) => url !== file.response
								);
								formik.setFieldValue("listImageUrls", updatedImageUrls);
							}}
						></MultiImagesUploadComponent>
					</Form.Item>
				</Col>
			</Form>
		</Modal>
	);
}

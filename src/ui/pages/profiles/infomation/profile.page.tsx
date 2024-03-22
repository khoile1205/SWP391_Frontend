import { UpdateUserInformationType } from "@/types/user";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { CheckCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Col,
	Divider,
	Form,
	Input,
	Radio,
	Row,
	Tooltip,
	Typography,
	Upload,
	UploadFile,
} from "antd";
import { Formik } from "formik";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RcFile } from "antd/es/upload";
import fileStore from "@/zustand/file.store";
import { Gender, Roles } from "@/enums";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { AppConstant } from "@/utils/constant";
import { useLoadingCallbackWithFormik } from "@/hooks/common";

const updateUserValidationSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	isMale: Yup.boolean().required("Gender is required"),
	address: Yup.string().required("Address is required"),
});

export default function ProfilePage() {
	const navigate = useNavigate();

	// Zustand state
	const { user, updateUserInformation } = userStore((state) => state);
	const { uploadImage } = fileStore((state) => state);
	// React state
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(user?.avatarUrl);

	// Controller
	const handleUpdateUser = useLoadingCallbackWithFormik(
		async (values: UpdateUserInformationType) => {
			const response = await updateUserInformation(values);
			if (!response.isSuccess) {
				showToast("error", response.message!);
			} else {
				showToast("success", response.message!);
			}
		},
		1000
	);

	const handleChangeAvatar = useMemo(() => {
		const handleAvatarChange = async (file: UploadFile) => {
			const response = await uploadImage(file.originFileObj as File, "avatar");
			if (response.isSuccess) {
				setAvatarUrl(response.data);
				return response.data;
			}
			return null;
		};

		return handleAvatarChange;
	}, [setAvatarUrl, uploadImage]);

	const customRequest = async ({ file, onSuccess, onError }: any) => {
		try {
			if (!handleBeforeUploadFile(file as RcFile)) {
				onError();
				return;
			}
			showToast("warning", "Uploading image ...");
			const response = await uploadImage(file as RcFile, AppConstant.avatarFolder);

			if (response.isSuccess) {
				const result = response.data;
				onSuccess(result, file);
			} else {
				throw new Error("Failed to upload file");
			}
		} catch (error) {
			console.error(error);
			showToast("error", (error as Error).message);
			onError(error);
		}
	};

	return user ? (
		<div className="">
			<Formik
				onSubmit={handleUpdateUser}
				initialValues={{
					address: user?.address || "",
					firstName: user?.firstName || "",
					lastName: user?.lastName || "",
					isMale: user?.isMale ?? true,
					userName: user?.userName || "",
					avatarUrl: user?.avatarUrl || "",
				}}
				validationSchema={updateUserValidationSchema}
				enableReinitialize
			>
				{({
					values,
					errors,
					handleChange,
					handleSubmit,
					touched,
					initialValues,
					setFieldValue,
				}) => (
					<>
						<div className="flex items-center justify-between">
							<Typography.Title className="!m-0 font-playfair" level={2}>
								Profile{" "}
							</Typography.Title>

							{isEdit ? (
								<button
									className="px-10 py-2 font-inter text-lg uppercase text-white"
									style={{
										backgroundColor: AppColor.deepOrangeColor,
										borderRadius: 4,
									}}
									onClick={() => {
										if (JSON.stringify(values) != JSON.stringify(initialValues)) {
											handleUpdateUser(values);
										}
										setIsEdit(false);
									}}
								>
									Save
								</button>
							) : (
								<button
									className="font-roboto px-10 py-2 text-lg uppercase text-white"
									style={{
										backgroundColor: AppColor.deepOrangeColor,
										borderRadius: 4,
									}}
									onClick={() => setIsEdit(true)}
								>
									Edit
								</button>
							)}
						</div>
						<Divider></Divider>
						<div className="flex flex-col items-center space-y-8 text-center sm:flex-row sm:space-x-2 sm:space-y-0">
							<Avatar rootClassName="w-24 h-24" src={avatarUrl}></Avatar>
							{user.role === Roles.CHEF && (
								<Tooltip title="This is the chef">
									<CheckCircleOutlined className="text-primary text-xl" />
								</Tooltip>
							)}
							<Upload
								customRequest={customRequest}
								name="avatarUrl"
								accept="image/*"
								onChange={async (info) => {
									if (info.file.status == "done") {
										const avatarUrl = await handleChangeAvatar(info.file);
										if (avatarUrl) setFieldValue("avatarUrl", avatarUrl);
										showToast("success", "Upload avatar successfully");
									}
								}}
								showUploadList={false}
							>
								<Button
									className="text-md ms-4 px-10 py-[4px] font-inter text-white hover:!border-white hover:!text-white"
									style={{
										backgroundColor: AppColor.deepOrangeColor,
										borderRadius: 4,
									}}
									onClick={() => setIsEdit(true)}
								>
									Change avatar
								</Button>
							</Upload>
						</div>
						<Divider></Divider>

						<Form className="space-y-8" onFinish={handleSubmit}>
							<Row className="space-y-8 sm:space-y-0">
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 0 }}
								>
									<Form.Item
										name={"userName"}
										required
										validateStatus={errors.userName ? "error" : "success"}
										help={
											errors.userName &&
											touched.userName && <div className="my-3">{errors.userName}</div>
										}
									>
										<Typography className="uppercase opacity-75">username</Typography>
										<Input
											name="userName"
											prefix={"@"}
											className={`border-b-1 mt-2 space-x-2 border border-x-0 border-t-0 ps-2`}
											disabled={true}
											defaultValue={values.userName}
											onChange={handleChange}
										></Input>
									</Form.Item>
								</Col>
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 1 }}
									className=""
								>
									<Typography className="uppercase opacity-75">password</Typography>
									<Input
										prefix={<LockOutlined></LockOutlined>}
										className={`border-b-1 mt-2 space-x-2 border border-x-0 border-t-0 ps-2`}
										value={"************"}
										disabled
									></Input>
									<div className="mt-2  text-end">
										<Typography.Link
											className={`hover:!text-primary text-end !text-gray-500 hover:cursor-pointer`}
											onClick={() => {
												window.scrollTo({ behavior: "smooth", top: 0 });
												navigate("/profile/change-password");
											}}
										>
											Change password
										</Typography.Link>
									</div>
								</Col>
							</Row>
							<Row className="space-y-8 sm:space-y-0">
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 0 }}
									className=""
								>
									<Form.Item
										name={"firstName"}
										required
										validateStatus={errors.firstName ? "error" : "success"}
										help={
											errors.firstName &&
											touched.firstName && <div className="my-3">{errors.firstName}</div>
										}
									>
										<Typography className="uppercase opacity-75">first name</Typography>
										<Input
											name="firstName"
											prefix={<UserOutlined></UserOutlined>}
											className={`border-b-1 mt-2 space-x-2 border border-x-0 border-t-0 ps-2`}
											disabled={!isEdit}
											defaultValue={values.firstName}
											onChange={handleChange}
										></Input>
									</Form.Item>
								</Col>
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 1 }}
									className=""
								>
									<Form.Item
										name={"lastName"}
										required
										validateStatus={errors.lastName ? "error" : "success"}
										help={
											errors.lastName &&
											touched.lastName && <div className="my-3">{errors.lastName}</div>
										}
									>
										<Typography className="uppercase opacity-75">last name</Typography>
										<Input
											name="lastName"
											prefix={<UserOutlined></UserOutlined>}
											className={`border-b-1 mt-2 space-x-2 border border-x-0 border-t-0 ps-2`}
											disabled={!isEdit}
											defaultValue={values.lastName}
											onChange={handleChange}
										></Input>
									</Form.Item>
								</Col>
							</Row>

							<Row className="space-y-8 sm:space-y-0">
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 0 }}
								>
									<Form.Item
										name={"isMale"}
										required
										validateStatus={errors.isMale ? "error" : "success"}
										help={
											errors.isMale && touched.isMale && <div className="my-3">{errors.isMale}</div>
										}
									>
										<div className="!flex items-center justify-between ">
											<Typography.Text className="uppercase opacity-75">Gender</Typography.Text>
											<Radio.Group
												name="isMale"
												className="w-5/6 ps-2"
												disabled={!isEdit}
												defaultValue={values.isMale ? Gender.MALE : Gender.FEMALE}
												onChange={(event) => {
													setFieldValue(
														"isMale",
														event.target.value === Gender.MALE ? true : false
													);
												}}
											>
												<Radio value={Gender.MALE}>Male</Radio>
												<Radio value={Gender.FEMALE}>Female</Radio>
											</Radio.Group>
										</div>
									</Form.Item>
								</Col>
								<Col
									xs={{ span: 24, offset: 0 }}
									md={{ span: 12, offset: 0 }}
									lg={{ span: 8, offset: 1 }}
								>
									<Form.Item
										name={"address"}
										required
										validateStatus={errors.address ? "error" : "success"}
										help={
											errors.address &&
											touched.address && <div className="my-3">{errors.address}</div>
										}
									>
										<div className="flex items-center justify-between ">
											<Typography.Text className="uppercase opacity-75">City</Typography.Text>
											<Input
												name="address"
												className={`border-b-1 w-5/6 border border-x-0 border-t-0 py-1`}
												disabled={!isEdit}
												defaultValue={values.address}
												onChange={handleChange}
											></Input>
										</div>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</>
				)}
			</Formik>

			<Divider></Divider>
		</div>
	) : (
		<></>
	);
}

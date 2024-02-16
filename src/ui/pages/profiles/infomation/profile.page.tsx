import { useLoadingCallbackWithFormik } from "@/hooks/useLoadingCallback";
import { Gender, UpdateUserInformationType } from "@/types/user";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { LockOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
	Avatar,
	Button,
	Col,
	Divider,
	Form,
	Input,
	Radio,
	Row,
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

const updateUserValidationSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	isMale: Yup.boolean().required("Gender is required"),
	address: Yup.string().required("Address is required"),
});

const handleBeforeUpload = (file: RcFile) => {
	const isPNG =
		file.type === "image/png" ||
		file.type == "image/jpeg" ||
		file.type === "image/jpg" ||
		file.type === "image/webp";
	if (!isPNG) {
		showToast("error", "Please upload a image file");
	}

	const isAcceptedFileSize = file.size < 1024 * 1024 * 10;
	if (!isAcceptedFileSize) {
		showToast("error", "Please upload a image file less than 10MB");
	}
	return isPNG && isAcceptedFileSize;
};

export default function ProfilePage() {
	//
	const navigate = useNavigate();

	// Zustand state
	const { user, updateUserInformation } = userStore((state) => state);
	const { uploadImage } = fileStore((state) => state);
	// React state
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEditPhoneNumber, setIsEditPhoneNumber] = useState<boolean>(false);
	const [isShowAccountBalance, setIsEditShowAccountBalance] = useState<boolean>(false);
	const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(user?.avatarUrl);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	// Hooks
	const balanceDisplay = useMemo(() => {
		return isShowAccountBalance ? "100000" : "******";
	}, [isShowAccountBalance]);

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
	return (
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
								Profile
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
						<div className="flex flex-col items-center space-y-8 text-center sm:flex-row sm:space-x-8 sm:space-y-0">
							<Avatar rootClassName="w-24 h-24" src={avatarUrl}></Avatar>
							<Upload
								action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
								name="avatarUrl"
								beforeUpload={handleBeforeUpload}
								onChange={async (info) => {
									if (info.file.status == "uploading" && !isUploading) {
										showToast("warning", "Uploading ...");
										setIsUploading(true);
										return;
									}
									if (info.file.status == "done") {
										showToast("success", "Upload avatar successfully");
										const avatarUrl = await handleChangeAvatar(info.file);
										if (avatarUrl) setFieldValue("avatarUrl", avatarUrl);
										setIsUploading(false);
										return;
									}

									if (info.file.status == "error") {
										showToast("error", "Upload avatar failed");
										return;
									}
								}}
								showUploadList={false}
							>
								<Button
									className="text-md px-10 py-[4px] font-inter text-white hover:!border-white hover:!text-white"
									style={{
										backgroundColor: AppColor.deepOrangeColor,
										borderRadius: 4,
									}}
									onClick={() => setIsEdit(true)}
								>
									Change avatar
								</Button>
							</Upload>

							<button
								className="text-md border px-8 py-[4px] font-inter"
								style={{
									borderRadius: 4,
								}}
								onClick={() => setIsEdit(true)}
							>
								Delete account
							</button>
						</div>
						<Divider></Divider>

						<Form className="space-y-8" onFinish={handleSubmit}>
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
											disabled={!isEdit}
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
									<Typography
										className={`mt-2 text-end text-[${AppColor.deepOrangeColor}] hover:cursor-pointer`}
										onClick={() => {
											window.scrollTo({ behavior: "smooth", top: 0 });
											navigate("/profile/change-password");
										}}
									>
										Change password
									</Typography>
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
												onChange={handleChange}
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

			<Form className="mt-10">
				<Row className="space-x-7">
					<Form className="block items-start space-x-5 sm:flex">
						<Form.Item label="Contact number" name="" rootClassName="flex items-center">
							<Input
								prefix={<div className="border-r-2 pe-2">+84</div>}
								className={`border-b-1 border border-x-0 border-t-0 ps-3`}
								disabled={!isEditPhoneNumber}
								value={user?.phoneNumber || ""}
							/>
						</Form.Item>
						<div className="flex items-start space-x-5">
							<Typography
								className={`mt-2 text-[${AppColor.deepOrangeColor}] hover:cursor-pointer`}
								onClick={() => {
									setIsEditPhoneNumber(!isEditPhoneNumber);
								}}
							>
								Change
							</Typography>
							<button
								className="p-2 text-white"
								style={{
									backgroundColor: AppColor.deepOrangeColor,
								}}
							>
								<Typography className="text-white">Verify phone number</Typography>
							</button>
						</div>
					</Form>
				</Row>
			</Form>

			<Divider></Divider>

			<Row className="flex-col py-3">
				<Typography.Title level={3}>NestCooking Wallet</Typography.Title>
				<div className="flex w-full items-center space-x-4  pt-3  sm:w-2/3">
					<WalletOutlined />
					<Typography.Text className="text-xl">{balanceDisplay} vnd</Typography.Text>
					{!isShowAccountBalance ? (
						<EyeIcon
							className="h-6 w-6 cursor-pointer text-gray-400"
							aria-hidden="true"
							onClick={() => setIsEditShowAccountBalance(!isShowAccountBalance)}
						/>
					) : (
						<EyeSlashIcon
							className="h-6 w-6 cursor-pointer text-gray-400"
							aria-hidden="true"
							onClick={() => setIsEditShowAccountBalance(!isShowAccountBalance)}
						/>
					)}
					<button
						className="text-md border px-8 py-[4px] font-inter"
						style={{
							borderRadius: 4,
						}}
					>
						<Typography.Text className="">View wallet</Typography.Text>
					</button>
				</div>
			</Row>
			<Divider></Divider>
			<Row>
				<Typography.Title level={3}>Recipes</Typography.Title>
			</Row>
		</div>
	);
}
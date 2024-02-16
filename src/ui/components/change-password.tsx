import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Formik, Field } from "formik";
import { Form, Input } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { ChangePasswordType } from "@/types/user";
import userStore from "@/zustand/user.store";
import { useLoadingStore } from "@/zustand/loading.store";
import { useNavigate } from "react-router-dom";

const changePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string().required("Current password is required"),
	newPassword: Yup.string()
		.required("New password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[!@#$%^&*.,_-]/, "Password must contain at least one special character")
		.notOneOf([Yup.ref("currentPassword")], "New password can't be the same as current password"),
	confirmPassword: Yup.string()
		.required("Please confirm your new password")
		.oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export default function ChangePassword() {
	const { changePassword } = userStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);

	const navigate = useNavigate();

	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const handleChangePassword = async (values: ChangePasswordType) => {
		const result = await changePassword(values);
		setLoading(true);
		setTimeout(() => {
			if (result.isSuccess) {
				showToast("success", AppString.passwordChangedSuccessMessage);
				navigate("/profile");
			} else {
				showToast("error", AppString.passwordChangedErorrMessage);
			}
			setLoading(false);
		}, 500);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Change Password
			</h2>
			<Formik
				initialValues={{
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				}}
				onSubmit={handleChangePassword}
				validationSchema={changePasswordSchema}
			>
				{({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<Form autoComplete="off" autoFocus className="space-y-5" onFinish={handleSubmit}>
							<Form.Item
								name="currentPassword"
								className="mb-0 mt-2"
								required
								validateStatus={errors.currentPassword ? "error" : "success"}
								help={
									errors.currentPassword &&
									touched.currentPassword && <div className="my-3">{errors.currentPassword}</div>
								}
							>
								<Field
									as={Input}
									id="currentPassword"
									name="currentPassword"
									type={!showCurrentPassword ? "password" : "text"}
									defaultValue={values.currentPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className=" w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<KeyOutlined className="site-form-item-icon me-2" />}
									suffix={
										<div className="mr-2">
											{!showCurrentPassword ? (
												<EyeIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
												/>
											) : (
												<EyeSlashIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
												/>
											)}
										</div>
									}
									placeholder="Current Password"
								/>
							</Form.Item>
							<Form.Item
								name="newPassword"
								className="mt-2"
								required
								validateStatus={errors.newPassword ? "error" : "success"}
								help={
									errors.newPassword &&
									touched.newPassword && <div className="my-3">{errors.newPassword}</div>
								}
							>
								<Field
									as={Input}
									id="newPassword"
									name="newPassword"
									type={!showNewPassword ? "password" : "text"}
									defaultValue={values.newPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									placeholder="New Password"
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<KeyOutlined className="site-form-item-icon me-2" />}
									suffix={
										<div className="mr-2">
											{!showNewPassword ? (
												<EyeIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowNewPassword(!showNewPassword)}
												/>
											) : (
												<EyeSlashIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowNewPassword(!showNewPassword)}
												/>
											)}
										</div>
									}
								/>
							</Form.Item>
							<Form.Item
								name="confirmPassword"
								className="mt-2"
								required
								validateStatus={errors.confirmPassword ? "error" : "success"}
								help={
									errors.confirmPassword &&
									touched.confirmPassword && <div className="my-3">{errors.confirmPassword}</div>
								}
							>
								<Field
									as={Input}
									id="confirmPassword"
									name="confirmPassword"
									type={!showConfirmPassword ? "password" : "text"}
									defaultValue={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									placeholder="Confirm New Password"
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<KeyOutlined className="site-form-item-icon me-2" />}
									suffix={
										<div className="mr-2">
											{!showConfirmPassword ? (
												<EyeIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												/>
											) : (
												<EyeSlashIcon
													className="h-6 w-6 cursor-pointer text-gray-400"
													aria-hidden="true"
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												/>
											)}
										</div>
									}
								/>
							</Form.Item>
							<button className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
								Change Password
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	);
}

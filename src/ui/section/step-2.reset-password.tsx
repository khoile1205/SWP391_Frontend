import { useState } from "react";
import { Formik } from "formik";
import { Col, Divider, Form, Input, Row, Typography } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import authStore from "@/zustand/auth.store";
import { useLoadingStore } from "@/zustand/loading.store";

interface Step2ResetPasswordValues {
	newPassword: string;
	confirmPassword: string;
}

const confirmPasswordValidationSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[!@#$%^&*.,_-]/, "Password must contain at least one special character"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "Passwords must match")
		.required("Please confirm your new password"),
});

interface Step2ResetPasswordProps {
	token: string;
	email: string;
}
export default function Step2ResetPassword({ token, email }: Step2ResetPasswordProps) {
	const [showNewPassword, updateVisibleNewPassword] = useState(false);
	const { setLoading } = useLoadingStore((state) => state);
	const [showConfirmPassword, updateVisibleConfirmPassword] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { resetPassword } = authStore((state) => state);

	const handleStep2 = async (values: Step2ResetPasswordValues) => {
		setLoading(true);
		const response = await resetPassword({
			...values,
			email,
			token,
		});

		if (response.isSuccess) {
			setIsSuccess(true);
		} else {
			// Show error notification
			showToast("error", AppString.resetPasswordErrorMessage);
		}

		setLoading(false);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<Formik
				initialValues={{
					newPassword: "",
					confirmPassword: "",
				}}
				onSubmit={handleStep2}
				validationSchema={confirmPasswordValidationSchema}
				validateOnBlur={false}
				validateOnChange={true}
			>
				{({
					setFieldTouched,
					validateField,
					values,
					errors,
					handleChange,
					handleSubmit,
					touched,
				}) =>
					!isSuccess ? (
						<div
							className="mt-10 border border-4 px-5 py-2 sm:mx-auto sm:w-full sm:max-w-3xl"
							onKeyDown={(event: React.KeyboardEvent) => {
								if (event.key === "Enter") {
									handleSubmit();
								}
							}}
						>
							<Form autoComplete="off" autoFocus className="space-y-3" onFinish={handleSubmit}>
								<Typography.Title className="my-3 mt-2" level={3}>
									{"Reset Password"}
								</Typography.Title>
								<Divider className="border"></Divider>
								<div>
									<Typography>{"Please enter your new password and confirm password"}</Typography>
								</div>
								<div className="mx-auto max-w-md sm:w-full">
									<Form.Item
										name="newPassword"
										className="mt-2"
										validateStatus={errors.newPassword ? "error" : "success"}
										help={
											errors.newPassword &&
											touched.newPassword && <div className="my-3">{errors.newPassword}</div>
										}
									>
										<Input
											id="newPassword"
											name="newPassword"
											type={showNewPassword ? "text" : "password"}
											defaultValue={values.newPassword}
											onChange={handleChange}
											onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
												setFieldTouched(e.target.name);
												validateField(e.target.name);
											}}
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<KeyOutlined className="site-form-item-icon me-2" />}
											suffix={
												touched.confirmPassword && (
													<div className="mr-2">
														{!showNewPassword ? (
															<EyeIcon
																className="h-6 w-6 cursor-pointer text-gray-400"
																aria-hidden="true"
																onClick={() => updateVisibleNewPassword(!showNewPassword)}
															/>
														) : (
															<EyeSlashIcon
																className="h-6 w-6 cursor-pointer text-gray-400"
																aria-hidden="true"
																onClick={() => updateVisibleNewPassword(!showNewPassword)}
															/>
														)}
													</div>
												)
											}
											placeholder="New Password"
										/>
									</Form.Item>
									<Form.Item
										name="confirmPassword"
										className="mt-2"
										validateStatus={errors.confirmPassword ? "error" : "success"}
										help={
											errors.confirmPassword &&
											touched.confirmPassword && (
												<div className="my-3">{errors.confirmPassword}</div>
											)
										}
									>
										<Input
											id="confirmPassword"
											name="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											defaultValue={values.confirmPassword}
											onChange={handleChange}
											onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
												setFieldTouched(e.target.name);
												validateField(e.target.name);
											}}
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<KeyOutlined className="site-form-item-icon me-2" />}
											suffix={
												touched.confirmPassword && (
													<div className="mr-2">
														{!showConfirmPassword ? (
															<EyeIcon
																className="h-6 w-6 cursor-pointer text-gray-400"
																aria-hidden="true"
																onClick={() => updateVisibleConfirmPassword(!showConfirmPassword)}
															/>
														) : (
															<EyeSlashIcon
																className="h-6 w-6 cursor-pointer text-gray-400"
																aria-hidden="true"
																onClick={() => updateVisibleConfirmPassword(!showConfirmPassword)}
															/>
														)}
													</div>
												)
											}
											placeholder="Confirm New Password"
										/>
									</Form.Item>
								</div>

								<Divider className="border"></Divider>

								<Row justify={"end"} gutter={{ xs: 10, sm: 10 }}>
									<Col xs={24} sm={6} className="order-2 sm:order-1">
										<a
											href="/sign-in"
											className={`flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
										>
											{"Cancel"}
										</a>
									</Col>
									<Col xs={24} sm={6} className="order-1 sm:order-2">
										<button
											type="submit"
											className="mb-3 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:mb-0"
										>
											{"Continue"}
										</button>
									</Col>
								</Row>
								{/* <button
								type="submit"
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								{"Set New Password"}
							</button> */}
							</Form>
						</div>
					) : (
						<div className="mt-10 border border-4 px-5 py-2 sm:mx-auto sm:w-full sm:max-w-3xl">
							<Typography.Title className="my-3 mt-2" level={3}>
								{"Reset Password Successfully"}
							</Typography.Title>
							<Divider className="border"></Divider>
							<div>
								<Typography>
									{"You have successfully reset your password, please log in again"}
								</Typography>
							</div>

							<Divider className="border"></Divider>
							<a
								href="/sign-in"
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								{"Log in"}
							</a>
						</div>
					)
				}
			</Formik>
		</div>
	);
}

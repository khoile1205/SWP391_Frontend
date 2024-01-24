import { useState } from "react";
import { Formik, Field } from "formik";
import { Form, Input } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "@/assets/Icon/Logo.svg";
import * as Yup from "yup";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const checkUsernameOrEmailExists = async (value: string, field: "username" | "email") => {
	// Simulate an API call to check existence
	const exists = await apiCheckUsernameOrEmailExists(value, field);
	return exists;
};

const apiCheckUsernameOrEmailExists = (value: string, field: "username" | "email") => {
	// Simulate API call
	return Promise.resolve(value === "existingUser" && field === "username");
};

interface Step1FormValues {
	username: string;
	email: string;
}

interface Step2FormValues {
	newPassword: string;
	confirmNewPassword: string;
}

const step1Schema = Yup.object().shape({
	username: Yup.string()
		.required("This field is required.")
		.test({
			name: "check-username-exists",
			test: async function (value) {
				if (value) {
					const exists = await checkUsernameOrEmailExists(value, "username");
					return exists || this.createError({ message: "Username does not exist" });
				}
				return true;
			},
		}),
});

const step2Schema = Yup.object().shape({
	newPassword: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("New Password is required"),
	confirmNewPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "Passwords must match")
		.required("Please confirm your new password"),
});

export default function ForgotPassword() {
	const [showNewPassword, updateVisibleNewPassword] = useState(false);
	const [showConfirmPassword, updateVisibleConfirmPassword] = useState(false);

	const [step, setStep] = useState(1);

	const handleStep1 = async (values: Step1FormValues) => {
		console.log("Step 1 - Username: ", values.username, " Email: ", values.email);

		// Show notification
		showToast("success", AppString.sendMailResetPasswordMessage);

		setStep(2);
	};

	const handleStep2 = async (values: Step2FormValues) => {
		console.log("Step 2 - New Password: ", values.newPassword);

		if (values.newPassword === values.confirmNewPassword) {
			// Show success notification
			showToast("success", AppString.resetPasswordSuccessMessage);

			// Redirect to homepage
			window.location.href = "/";
		} else {
			// Show error notification
			showToast("error", AppString.resetPasswordErrorMessage);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<a href="/" className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{step === 1 ? "Account Recovery - Step 1" : "Account Recovery - Step 2"}
				</h2>
			</a>
			<Formik
				initialValues={{
					username: "",
					email: "",
					newPassword: "",
					confirmNewPassword: "",
				}}
				onSubmit={step === 1 ? handleStep1 : handleStep2}
				validationSchema={step === 1 ? step1Schema : step2Schema}
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
				}) => (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<Form autoComplete="off" autoFocus className="space-y-3" onFinish={handleSubmit}>
							{step === 1 ? (
								<>
									<Form.Item name="username" className="mt-2">
										<Field
											as={Input}
											id="username"
											name="username"
											type="text"
											defaultValue={values.username}
											onChange={handleChange}
											onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
												setFieldTouched(e.target.name);
												validateField(e.target.name);
											}}
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<UserOutlined className="site-form-item-icon me-2" />}
											placeholder="Username or Email"
										/>
									</Form.Item>
								</>
							) : (
								<>
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
												touched.confirmNewPassword && (
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
										name="confirmNewPassword"
										className="mt-2"
										validateStatus={errors.confirmNewPassword ? "error" : "success"}
										help={
											errors.confirmNewPassword &&
											touched.confirmNewPassword && (
												<div className="my-3">{errors.confirmNewPassword}</div>
											)
										}
									>
										<Input
											id="confirmNewPassword"
											name="confirmNewPassword"
											type={showConfirmPassword ? "text" : "password"}
											defaultValue={values.confirmNewPassword}
											onChange={handleChange}
											onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
												setFieldTouched(e.target.name);
												validateField(e.target.name);
											}}
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<KeyOutlined className="site-form-item-icon me-2" />}
											suffix={
												touched.confirmNewPassword && (
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
								</>
							)}
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								{step === 1 ? "Send Confirmation Email" : "Set New Password"}
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	);
}

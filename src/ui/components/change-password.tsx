import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Formik, Field } from "formik";
import { Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import * as Yup from "yup";

// interface ChangePasswordFormValues {
// 	CurrentPassword: string;
// 	NewPassword: string;
// 	ConfirmPassword: string;
// }

const changePasswordSchema = Yup.object().shape({
	CurrentPassword: Yup.string().required("Current password is required"),
	NewPassword: Yup.string()
		.required("New password is required")
		.min(8, "Password must be at least 8 characters"),
	ConfirmPassword: Yup.string()
		.required("Please confirm your new password")
		.oneOf([Yup.ref("NewPassword")], "Passwords must match"),
});

export default function ChangePassword() {
	const [show, updateVisiblePass] = useState(false);
	const [, setNotificationMessage] = useState<string | null>(null);
	const [, setNotificationType] = useState<"success" | "error">("success");

	const openNotification = (type: "success" | "error", message: string) => {
		notification[type]({
			message,
		});
	};

	const handleChangePassword = async () => {
		setNotificationType("success");
		setNotificationMessage("Password changed successfully");
		openNotification("success", "Password changed successfully");
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Change Password
			</h2>
			<Formik
				initialValues={{
					CurrentPassword: "",
					NewPassword: "",
					ConfirmPassword: "",
				}}
				onSubmit={async () => {
					await handleChangePassword();
				}}
				validationSchema={changePasswordSchema}
			>
				{({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<Form autoComplete="off" autoFocus className="space-y-3" onFinish={handleSubmit}>
							<Form.Item
								name="CurrentPassword"
								className="mt-2"
								required
								validateStatus={errors.CurrentPassword ? "error" : "success"}
								help={
									errors.CurrentPassword &&
									touched.CurrentPassword && <div className="my-3">{errors.CurrentPassword}</div>
								}
							>
								<Field
									as={Input}
									id="CurrentPassword"
									name="CurrentPassword"
									type="password"
									defaultValue={values.CurrentPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<UserOutlined className="site-form-item-icon me-2" />}
									placeholder="Current Password"
								/>
							</Form.Item>
							<Form.Item
								name="NewPassword"
								className="mt-2"
								required
								validateStatus={errors.NewPassword ? "error" : "success"}
								help={
									errors.NewPassword &&
									touched.NewPassword && <div className="my-3">{errors.NewPassword}</div>
								}
							>
								<Input
									id="NewPassword"
									name="NewPassword"
									type={!show ? "password" : "text"}
									defaultValue={values.NewPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									placeholder="New Password"
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<UserOutlined className="site-form-item-icon me-2" />}
									suffix={
										touched.NewPassword && (
											<div className="mr-2">
												{!show ? (
													<EyeIcon
														className="h-6 w-6 cursor-pointer text-gray-400"
														aria-hidden="true"
														onClick={() => updateVisiblePass(!show)}
													/>
												) : (
													<EyeSlashIcon
														className="h-6 w-6 cursor-pointer text-gray-400"
														aria-hidden="true"
														onClick={() => updateVisiblePass(!show)}
													/>
												)}
											</div>
										)
									}
								/>
							</Form.Item>
							<Form.Item
								name="ConfirmPassword"
								className="mt-2"
								required
								validateStatus={errors.ConfirmPassword ? "error" : "success"}
								help={
									errors.ConfirmPassword &&
									touched.ConfirmPassword && <div className="my-3">{errors.ConfirmPassword}</div>
								}
							>
								<Input
									id="ConfirmPassword"
									name="ConfirmPassword"
									type="password"
									defaultValue={values.ConfirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									placeholder="Confirm New Password"
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<UserOutlined className="site-form-item-icon me-2" />}
								/>
							</Form.Item>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								Change Password
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	);
}

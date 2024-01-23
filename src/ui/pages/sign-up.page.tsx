import { SignUpInformation } from "@/types/auth";
import { showToast } from "@/utils/notify";
import { signUpValidationSchema } from "@/utils/validation";
import { useLoadingStore } from "@/zustand/loading.store";
import userStore from "@/zustand/user.store";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Row, Col, Input, Checkbox, Form } from "antd";
import { FormikHelpers, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const { signUp } = userStore((state) => state);
	const { setLoading } = useLoadingStore((state) => state);
	const [show, updateVisiblePass] = useState(false);
	const navigate = useNavigate();
	const handleSignUp = async (
		values: SignUpInformation,
		{ setSubmitting }: FormikHelpers<SignUpInformation>
	) => {
		try {
			setLoading(true);

			const result = await signUp(values);

			if (!result.isSuccess) {
				showToast("error", result.message!);
			} else {
				showToast("success", result.message!);
				setTimeout(() => {
					navigate("/sign-in");
				}, 1000);
			}
		} catch (error) {
			showToast("error", (error as Error).message);
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Sign up to your account
			</h2>
			<Formik
				initialValues={{
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					password: "",
				}}
				onSubmit={handleSignUp}
				validationSchema={signUpValidationSchema}
			>
				{({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<Form autoComplete="off" autoFocus onFinish={handleSubmit} layout="vertical">
							<Row gutter={16}>
								<Col span={24} sm={{ span: 12 }}>
									<Form.Item
										hasFeedback
										name="firstName"
										className="mt-2"
										label="First name"
										required
										validateStatus={errors.firstName ? "error" : "success"}
										help={
											errors.firstName &&
											touched.firstName && <div className=" my-3">{errors.firstName}</div>
										}
									>
										<Input
											id="firstName"
											name="firstName"
											type="text"
											defaultValue={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<UserOutlined className="site-form-item-icon me-2" />}
											placeholder="First name"
										/>
									</Form.Item>
								</Col>
								<Col span={24} sm={{ span: 12 }}>
									<Form.Item
										hasFeedback
										name="lastName"
										className="mt-2"
										label="Last name"
										required
										validateStatus={errors.lastName ? "error" : "success"}
										help={
											errors.lastName &&
											touched.lastName && <div className=" my-3">{errors.lastName}</div>
										}
									>
										<Input
											id="lastName"
											name="lastName"
											type="text"
											defaultValue={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
											prefix={<UserOutlined className="site-form-item-icon me-2" />}
											placeholder="Last name"
										/>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item
								hasFeedback
								name="email"
								className="mt-2"
								label="Email"
								required
								validateStatus={errors.email ? "error" : "success"}
								help={errors.email && touched.email && <div className=" my-3">{errors.email}</div>}
							>
								<Input
									id="email"
									name="email"
									type="text"
									defaultValue={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<MailOutlined className="site-form-item-icon me-2" />}
									placeholder="Email"
								/>
							</Form.Item>
							<Form.Item
								hasFeedback
								name="username"
								className="mt-2"
								label="Username"
								required
								validateStatus={errors.username ? "error" : "success"}
								help={
									errors.username &&
									touched.username && <div className=" my-3">{errors.username}</div>
								}
							>
								<Input
									id="username"
									name="username"
									type="text"
									defaultValue={values.username}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<UserOutlined className="site-form-item-icon me-2" />}
									placeholder="Username"
								/>
								{errors.username && touched.username && (
									<div className=" my-3">{errors.username}</div>
								)}
							</Form.Item>
							<Form.Item
								hasFeedback
								name="password"
								className="mt-2"
								label="Password"
								required
								validateStatus={errors.password ? "error" : "success"}
								help={
									errors.password &&
									touched.password && <div className=" my-3">{errors.password}</div>
								}
							>
								<Input
									id="password"
									name="password"
									type={!show ? "password" : "text"}
									defaultValue={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									placeholder="Password"
									className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
									prefix={<UserOutlined className="site-form-item-icon me-2" />}
									suffix={
										touched.password && (
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
								hasFeedback
								name="agreement"
								valuePropName="checked"
								rules={[
									{
										validator: (_, value) =>
											value
												? Promise.resolve()
												: Promise.reject(new Error("Should accept agreement")),
									},
								]}
							>
								<Checkbox>
									I have read the <a href="">agreement</a>
								</Checkbox>
							</Form.Item>

							<Form.Item className="text-center">
								<button
									type="submit"
									className="mt-2 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
								>
									Sign up
								</button>
							</Form.Item>
						</Form>

						<p className="mt-6 text-center text-sm text-gray-500">
							Already have account ?{" "}
							<a
								href="/sign-in"
								className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
							>
								Sign in now
							</a>
						</p>
					</div>
				)}
			</Formik>
		</div>
	);
}

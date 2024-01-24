import AppString from "@/utils/app-string";
import { showToast } from "@/utils/notify";
import { loginSchema } from "@/utils/validation";
import { useLoadingStore } from "@/zustand/loading.store";
import userStore from "@/zustand/user.store";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input, Checkbox, Typography, Button, Form } from "antd";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import FacebookLogo from "@/assets/Icon/facebook-icon.svg";
import GmailLogo from "@/assets/Icon/gmail-logo.svg";
import { useState } from "react";

interface SignInInformation {
	username: string;
	password: string;
	isRemember: boolean;
}
export default function SignInPage() {
	const { login } = userStore((state) => state);
	const [show, updateVisiblePass] = useState(false);
	const { setLoading } = useLoadingStore((state) => state);
	const navigate = useNavigate();

	const handleLogin = async (values: SignInInformation) => {
		try {
			setLoading(true);

			const result = await login(values);

			if (result.isSuccess) {
				showToast("success", AppString.loginSuccessfully);
				navigate("/");
			} else {
				showToast("error", result.message!);
			}
		} catch (error) {
			showToast("error", (error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen flex-1 flex-col  justify-center px-6 lg:px-8">
			<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Sign in to your account
			</h2>
			<Formik
				initialValues={{
					username: "",
					password: "",
					isRemember: false,
				}}
				onSubmit={handleLogin}
				validationSchema={loginSchema}
			>
				{({ values, errors, handleChange, handleBlur, touched }) => (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<Form autoComplete="off" autoFocus className="space-y-3" onFinish={handleLogin}>
							<Form.Provider>
								<Form.Item
									name="username"
									className="mt-2"
									required
									validateStatus={errors.username ? "error" : "success"}
									help={
										errors.username &&
										touched.username && <div className="my-3">{errors.username}</div>
									}
								>
									<Field
										as={Input}
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
								</Form.Item>
								<Form.Item
									name="password"
									className="mt-2"
									required
									validateStatus={errors.password ? "error" : "success"}
									help={
										errors.password &&
										touched.password && <div className="my-3">{errors.password}</div>
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
										prefix={<KeyOutlined className="site-form-item-icon me-2" />}
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
							</Form.Provider>

							<div className="mt-2 text-end text-sm">
								<a
									href="/forgot-password"
									className="font-semibold text-primary-600 hover:text-primary-500"
								>
									Forgot password?
								</a>
							</div>
							<div className="mt-2 text-center">
								<Form.Item name="isRemember" valuePropName="checked" noStyle>
									<Checkbox checked={values.isRemember} onChange={handleChange}>
										Remember me
									</Checkbox>
								</Form.Item>
							</div>

							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								Sign in
							</button>
						</Form>
						<Typography className="mt-5 text-center text-sm text-gray-500">
							or login with
						</Typography>
						<div className="mt-4 flex justify-evenly">
							<Button className="flex space-x-3 bg-gray-100">
								<img src={GmailLogo} alt="" className="h-6 w-6" />
								<Typography>Gmail</Typography>
							</Button>
							<Button className="flex space-x-3 bg-gray-100">
								<img src={FacebookLogo} alt="" className="h-6 w-6" />
								<Typography>Facebook</Typography>
							</Button>
						</div>
						<p className="mt-6 text-center text-sm text-gray-500">
							Don't have an account ?{" "}
							<a
								href="/sign-up"
								className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
							>
								Sign up now
							</a>
						</p>
					</div>
				)}
			</Formik>
		</div>
	);
}

import { Avatar, Col, Divider, Form, Input, Row, Skeleton, Typography } from "antd";
import { showToast } from "@/utils/notify";
import AppString from "@/utils/app-string";
import { UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { transformEmail } from "@/utils/string.extension";
import authStore from "@/zustand/auth.store";
import Link from "antd/es/typography/Link";
import { useLoadingStore } from "@/zustand/loading.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadingCallback } from "@/hooks/common";

export default function Step1ResetPassword() {
	const { verifyIdentifierResetPassword, sendEmailResetPassword } = authStore((state) => state);
	const navigator = useNavigate();
	const { isLoading } = useLoadingStore((state) => state);
	const [identifier, setIdentifier] = useState<string>("");
	const [step, setStep] = useState(1);
	const [isValidated, setIsValidated] = useState<boolean>(true);
	const [userData, setUserData] = useState<any>(null);

	const handleValidateEmail = useLoadingCallback(async () => {
		const existedUser = await verifyIdentifierResetPassword({
			identifier,
		});

		if (existedUser.isSuccess) {
			setUserData(existedUser.data);
			setIsValidated(true);
			setStep(2);
		} else {
			setIsValidated(false);
		}
	}, 500);

	const handleSendEmail = useLoadingCallback(async () => {
		const isSendEmail = await sendEmailResetPassword({
			identifier,
		});
		// Show notification
		if (isSendEmail.isSuccess) {
			showToast("warning", AppString.sendMailResetPasswordMessage);
			navigator("/sign-in");
		} else {
			showToast("error", AppString.sendMailResetPasswordErrorMessage);
		}
	}, 500);
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			{/* <a href="/" className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img className="" src={Logo} alt="Your Company" />
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{step === 1 ? "Account Recovery - Step 1" : "Account Recovery - Step 2"}
				</h2>
			</a> */}
			{step == 1 ? (
				<div
					className="mt-10 border border-4  px-5 py-2 sm:mx-auto sm:w-full sm:max-w-3xl"
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.key === "Enter") {
							handleValidateEmail();
						}
					}}
				>
					<Typography.Title className="my-3 mt-2" level={3}>
						{"Find your account"}
					</Typography.Title>
					<Divider className="border"></Divider>
					<div className="">
						<Typography>{"Please enter your email or username to search your account"}</Typography>
					</div>
					<Form autoComplete="off" autoFocus className="space-y-3">
						<Form.Item name="identifier" className="mt-2">
							<Input
								id="identifier"
								name="identifier"
								type="text"
								defaultValue={identifier}
								onChange={(event: any) => setIdentifier(event.currentTarget.value)}
								className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
								prefix={<UserOutlined className="site-form-item-icon me-2" />}
								placeholder="Username or Email"
							/>
						</Form.Item>
						{!isValidated && <Typography>Can't find any user</Typography>}
					</Form>
					<Divider className="border"></Divider>

					<Row justify={"end"} gutter={{ xs: 10, sm: 10 }}>
						<Col xs={24} sm={6} className="order-2 sm:order-1">
							<a
								href="/sign-in"
								className={`${isLoading ? "disabled" : ""} flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
							>
								{"Cancel"}
							</a>
						</Col>
						<Col xs={24} sm={6} className="order-1 sm:order-2">
							<button
								type="submit"
								onClick={handleValidateEmail}
								className="mb-3 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:mb-0"
							>
								{"Continue"}
							</button>
						</Col>
					</Row>
				</div>
			) : (
				<div
					className="mt-10 border border-4 px-5 py-2 sm:mx-auto sm:w-full sm:max-w-3xl"
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.key === "Enter") {
							handleSendEmail();
						}
					}}
				>
					<Typography.Title className="my-3 mt-2" level={3}>
						{"We have sent link to your email for verify the account"}
					</Typography.Title>
					<Divider className="border"></Divider>
					<Row>
						<Col className="" span={14}>
							<Typography>{"We have sent link to your email for verify the account"}</Typography>
							<Typography> {transformEmail(userData.email)}</Typography>
						</Col>
						<Col span={10} className="text-center">
							<Skeleton loading={false} avatar active className="">
								<Meta
									avatar={
										<Avatar
											size={50}
											src={
												userData.avatarURL ??
												"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											}
										/>
									}
									title={<Typography.Title level={5}>{userData.username}</Typography.Title>}
									description={
										<Link
											onClick={() => {
												setStep(1);
											}}
										>
											Not you ?
										</Link>
									}
								/>
							</Skeleton>
						</Col>
					</Row>
					<Divider className="border"></Divider>

					<button
						onClick={handleSendEmail}
						className="mt-2 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
					>
						{"Continue..."}
					</button>
				</div>
			)}
		</div>
	);
}

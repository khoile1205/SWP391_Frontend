import { User } from "@/models/user.model";
import AppColor from "@/utils/appColor";
import { showToast } from "@/utils/notify";
import { Modal, Typography, Col, Row, Input, Form } from "antd";
import { useFormik } from "formik";
import React from "react";
import { number, object } from "yup";
interface Props {
	user: User | null;
	open: boolean;
	setOpen: (value: boolean) => void;
	handleLockAccount: (user: User, minutes: number) => void;
}

const validationSchema = object().shape({
	minutes: number()
		.min(1, "Locked time must be at least 1 minutes")
		.required("Minutes must be required"),
});
export const LockAccountModal: React.FC<Props> = ({ user, open, setOpen, handleLockAccount }) => {
	const formik = useFormik({
		initialValues: {
			minutes: 0,
		},
		onSubmit: () => {
			handleLockAccount(user!, formik.values.minutes);
			setOpen(false);
		},
		validateOnChange: true,
		validationSchema: validationSchema,
		enableReinitialize: true,
		isInitialValid: false,
	});
	return (
		user && (
			<Modal
				open={open}
				onCancel={() => {
					setOpen(false);
					formik.resetForm();
				}}
				onOk={async () => {
					if (formik.isValid) {
						formik.handleSubmit();
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
					Lock Account
				</Typography.Title>
				<Form onFinish={formik.handleSubmit} className="flex flex-col">
					<Col>
						<Row className="">
							<Col span={24}>
								<Typography.Text strong>You will be lock user: {user.userName}</Typography.Text>
							</Col>
							<Col span={24}>
								<Form.Item
									labelCol={{ span: 5 }}
									labelAlign="left"
									hasFeedback
									name="title"
									className="mt-2"
									label="Minutes"
									required
									validateStatus={
										formik.errors.minutes && formik.touched.minutes ? "error" : "success"
									}
									help={
										formik.errors.minutes &&
										formik.touched.minutes && (
											<div className="mt-1 text-red-500">{formik.errors.minutes as string}</div>
										)
									}
								>
									<Input
										type="number"
										min={1}
										{...formik.getFieldProps("minutes")}
										size="small"
										required
										className="w-full rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
										placeholder="minutes"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Form>
			</Modal>
		)
	);
};

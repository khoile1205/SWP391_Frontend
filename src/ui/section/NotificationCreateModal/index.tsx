import { NotificationTypes } from "@/enums/notification.type.enum";
import { useAuthenticateFeature } from "@/hooks/common";
import { showToast } from "@/utils/notify";
import { adminStore } from "@/zustand/admin.store";
import { Modal, Input, Form, Typography } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
interface Props {
	visible: boolean;
	setVisible: (value: boolean) => void;
}

const createNotificationFormValidationSchema = Yup.object().shape({
	content: Yup.string().required("Message must be specified"),
});
export const NotificationCreateModal: React.FC<Props> = ({ setVisible, visible }) => {
	const { createSystemNotification } = adminStore((state) => state);
	const formik = useFormik({
		initialValues: {
			content: "",
		},
		onSubmit: () => {
			handleSubmitForm();
		},
		validationSchema: createNotificationFormValidationSchema,
		isInitialValid: false,
	});

	const handleSubmitForm = useAuthenticateFeature(async () => {
		const response = await createSystemNotification({
			content: formik.values.content,
			notificationType: NotificationTypes.ANNOUNCEMENT,
			targetType: "",
			receiverId: "",
			senderId: "",
		});

		if (response.isSuccess) {
			showToast("success", response.message as string);
			setVisible(false);
		} else {
			showToast("error", response.message as string);
		}
	});
	const handleOk = () => {
		formik.handleSubmit();
		setVisible(false);
	};

	const handleCancel = () => {
		formik.resetForm();
		setVisible(false);
	};

	return (
		<div className="p-4">
			<Modal
				title={
					<Typography.Title level={3} className="text-center">
						System Notification Form
					</Typography.Title>
				}
				open={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{ className: "text-white bg-primary px-5" }}
				okText={"Send"}
				centered
				className="text-center"
			>
				<Form layout="vertical">
					<Form.Item
						label={
							<Typography.Text strong className="text-lg">
								Content
							</Typography.Text>
						}
						name="content"
						rules={[{ required: true, message: "Please enter the content" }]}
						className="mb-0"
					>
						<Input.TextArea
							rows={4}
							placeholder="Enter notification content here..."
							className="mt-1 rounded-md"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

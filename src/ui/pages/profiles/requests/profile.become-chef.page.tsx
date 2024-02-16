import { Button, Col, Form, Image, Modal, Result, Row, Typography } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextArea from "antd/es/input/TextArea";
import AppColor from "@/utils/appColor";
import CreateRequestModal from "./profile.created-request.modal";
import { CloseCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { ActionStatus } from "@/enums/status";
import { becomeChefRequestStore } from "@/zustand/become-chef-request";
import { showToast } from "@/utils/notify";

dayjs.extend(customParseFormat);

const { confirm } = Modal;

const renderStatusOfRequest = (status: ActionStatus) => {
	switch (status) {
		case ActionStatus.ACCEPTED: {
			return `text-white ${`bg-[${AppColor.greenColor}]`}`;
		}
		case ActionStatus.REJECTED: {
			return `text-white ${`bg-[${AppColor.deepOrangeColor}]`}`;
		}
		case ActionStatus.PENDING: {
			return `text-red-700 ${`bg-[${AppColor.yellowColor}]`}`;
		}
	}
};

const showDeleteConfirm = (handleDeleteRequest: () => void) => {
	confirm({
		title: "Are you sure delete this task?",
		icon: <ExclamationCircleFilled />,
		content: "Some descriptions",
		okText: "Yes",
		okType: "danger",
		cancelText: "No",
		onOk() {
			handleDeleteRequest();
		},
		onCancel() {
			console.log("Cancel");
		},
	});
};

export default function ProfileBecomeChefPage() {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [isHaveRequest] = useState<boolean>(true);
	const { deleteRequestById } = becomeChefRequestStore((state) => state);

	const handleDeleleRequest = () => {
		showToast("info", "Deleting the request...");
		setTimeout(async () => {
			const response = await deleteRequestById("6c574c58-af7c-4e61-9a3d-4ceae16ad23f");
			showToast(response.isSuccess ? "success" : "error", response.message!);
		}, 1000);
	};
	return (
		<>
			{!isHaveRequest ? (
				<Result
					icon={
						<CloseCircleOutlined
							style={{
								color: AppColor.deepOrangeColor,
							}}
						/>
					}
					title="Sorry, you are not have any request to become a chef."
					extra={
						<button
							className="rounded-md px-4 py-2 text-white"
							style={{
								backgroundColor: AppColor.deepOrangeColor,
							}}
							onClick={() => setOpenModal(true)}
						>
							Create
						</button>
					}
				/>
			) : (
				<div className="mt-4">
					<Typography.Title level={3} className="text-center">
						Chef Application Form
					</Typography.Title>
					<div className="flex flex-col sm:flex-row">
						<Col span={6} xs={24} md={6}>
							<Typography.Title level={5}>
								<Typography.Text style={{ color: "red" }}>*</Typography.Text> Identity Image
							</Typography.Title>
							<div className="text-center">
								{[
									"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHH8mepO4avVq5NJFuruMoqN02xAqm5Jk7IryH9iVuNw&s",
								].map((image) => (
									<Image key={image} src={image} alt="image"></Image>
								))}
							</div>

							<Typography.Title level={5}>
								<Typography.Text style={{ color: "red" }}>*</Typography.Text> Certificate Images
							</Typography.Title>
							<div className="text-center">
								{[
									"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHH8mepO4avVq5NJFuruMoqN02xAqm5Jk7IryH9iVuNw&s",
								].map((image) => (
									<Image key={image} src={image} alt="image"></Image>
								))}
							</div>
						</Col>
						<Col span={16} xs={24} md={{ span: 16, offset: 2 }}>
							<div className="mt-3 space-y-3">
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={11} xs={24} md={11}>
										<div className="flex items-center space-x-2 ">
											<Typography className="basis-1/3">Full name</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
									<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Status</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 ${renderStatusOfRequest(ActionStatus.PENDING)} shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												{ActionStatus.PENDING}
											</Typography>
										</div>
									</Col>
								</Row>
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={11} xs={24} md={11}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Email</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
									<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Phone number</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
								</Row>
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={11} xs={24} md={11}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Address</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
									<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Gender</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
								</Row>
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={11} xs={24} md={11}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Date of birth</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
									<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
										<div className="flex items-center space-x-2">
											<Typography className="basis-1/3">Specialize Category</Typography>
											<Typography
												className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
											>
												zxcvdfgzdf
											</Typography>
										</div>
									</Col>
								</Row>
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={24}>
										<Form.Item hasFeedback name="chefDetail" className="mt-2" label="Experience">
											<TextArea readOnly rows={5} maxLength={300} placeholder={"Default Value"} />
										</Form.Item>
									</Col>
								</Row>
								<Row className="space-y-3 text-center sm:space-y-0">
									<Col span={24}>
										<Form.Item hasFeedback name="experience" className="mt-2" label="Achivement">
											<TextArea rows={5} readOnly maxLength={300} placeholder={"Default Value"} />
										</Form.Item>
									</Col>
								</Row>
							</div>
						</Col>
					</div>
					<div className="text-end">
						<Button
							className="rounded-md text-white"
							style={{
								backgroundColor: AppColor.deepOrangeColor,
							}}
							onClick={() => showDeleteConfirm(handleDeleleRequest)}
						>
							Delete the request
						</Button>
					</div>
				</div>
			)}
			<CreateRequestModal
				open={openModal}
				onClick={(status: boolean) => setOpenModal(status)}
			></CreateRequestModal>
		</>
	);
}

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
import useUserChefRequest from "@/hooks/useUserChefRequest";

dayjs.extend(customParseFormat);

const { confirm } = Modal;

const renderStatusOfRequest = (status: ActionStatus) => {
	switch (status) {
		case ActionStatus.ACCEPTED: {
			return `text-white ${`bg-[#50d71e]`}`;
		}
		case ActionStatus.REJECTED: {
			return `text-white ${`bg-[#ff642f]`}`;
		}
		case ActionStatus.PENDING: {
			return `text-red-700 ${`bg-[#fbec5d]`}`;
		}
	}
};

const showDeleteConfirm = (handleDeleteRequest: () => void) => {
	confirm({
		title: "Warning !",
		icon: <ExclamationCircleFilled />,
		content: "Are you sure delete this request?",
		okText: "Yes",
		okType: "danger",
		cancelText: "No",
		onOk() {
			handleDeleteRequest();
		},
	});
};

const dateFormat = "DD-MM-YYYY";

export default function ProfileBecomeChefPage() {
	const { request } = useUserChefRequest();
	const [openModal, setOpenModal] = useState<boolean>(false);

	const { deleteRequestById } = becomeChefRequestStore((state) => state);

	console.log(request);
	const handleDeleleRequest = async () => {
		showToast("info", "Deleting the request...");
		const response = await deleteRequestById(request?.requestChefId as string);

		setTimeout(() => {
			if (response.isSuccess) {
				showToast("success", response.message!);
				window.location.reload();
			} else {
				showToast("error", response.message!);
			}
		}, 1000);
	};
	return (
		<>
			{!request ? (
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
				<>
					<div className="my-4">
						<Typography.Title level={3} className="text-center">
							Chef Application Form
						</Typography.Title>
						<div className="flex flex-col sm:flex-row">
							<Col span={6} xs={24} md={6}>
								<Typography.Title level={5}>
									<Typography.Text style={{ color: "red" }}>*</Typography.Text> Identity Image
								</Typography.Title>
								<div className="text-center">
									<Image
										key={request.identityImageUrl}
										src={request.identityImageUrl}
										alt="image"
									></Image>
								</div>

								<Typography.Title level={5}>
									<Typography.Text style={{ color: "red" }}>*</Typography.Text> Certificate Images
								</Typography.Title>
								<div className="text-center">
									{request.certificateImageUrls.map((image) => (
										<Image key={image} src={image} alt="image"></Image>
									))}
								</div>
							</Col>
							<Col span={16} xs={24} md={{ span: 16, offset: 2 }}>
								<div className="mt-5 space-y-6">
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={11} xs={24} md={11}>
											<div className="flex items-center space-x-2 ">
												<Typography className="basis-1/3">Full name</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.fullName}
												</Typography>
											</div>
										</Col>
										<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Status</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 ${renderStatusOfRequest(request.status)} shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.status}
												</Typography>
											</div>
										</Col>
									</Row>
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={11} xs={24} md={11}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Email</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.email}
												</Typography>
											</div>
										</Col>
										<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Phone number</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.phoneNumber}
												</Typography>
											</div>
										</Col>
									</Row>
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={11} xs={24} md={11}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Address</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.address}
												</Typography>
											</div>
										</Col>
										<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Gender</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.gender}
												</Typography>
											</div>
										</Col>
									</Row>
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={11} xs={24} md={11}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Date of birth</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{dayjs(request.dob).format(dateFormat)}
												</Typography>
											</div>
										</Col>
										<Col span={11} xs={24} md={{ span: 11, offset: 2 }}>
											<div className="flex items-center space-x-2">
												<Typography className="basis-1/3">Specialize Category</Typography>
												<Typography
													className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
												>
													{request.category}
												</Typography>
											</div>
										</Col>
									</Row>
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={24}>
											<Form.Item hasFeedback name="chefDetail" className="mt-2" label="Experience">
												<TextArea
													readOnly
													rows={5}
													maxLength={300}
													placeholder={"Default Value"}
													value={request.experience}
												/>
											</Form.Item>
										</Col>
									</Row>
									<Row className="space-y-6 text-center sm:space-y-0">
										<Col span={24}>
											<Form.Item hasFeedback name="experience" className="mt-2" label="Achivement">
												<TextArea
													rows={5}
													readOnly
													maxLength={300}
													value={request.achievement}
													placeholder={"Default Value"}
												/>
											</Form.Item>
										</Col>
									</Row>
								</div>
							</Col>
						</div>
						<div className="flex justify-end space-x-4">
							<div className="text-end">
								<Button
									type="default"
									className=" rounded-md !border-0 !text-white"
									style={{
										backgroundColor: AppColor.greenColor,
									}}
									onClick={() => setOpenModal(true)}
								>
									Edit the request
								</Button>
							</div>
							<div className="text-end">
								<Button
									className="rounded-md !border-0 !text-white"
									style={{
										backgroundColor: AppColor.deepOrangeColor,
									}}
									onClick={() => showDeleteConfirm(handleDeleleRequest)}
								>
									Delete the request
								</Button>
							</div>
						</div>
					</div>
				</>
			)}
			<CreateRequestModal
				open={openModal}
				onClick={(status: boolean) => {
					setOpenModal(status);
				}}
				request={request}
			></CreateRequestModal>
		</>
	);
}

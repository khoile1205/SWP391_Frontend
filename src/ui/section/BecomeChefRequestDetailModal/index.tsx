import { ActionStatus } from "@/enums";
import { BecomeChefRequest } from "@/models/become-chef-request.model";
import { Col, Form, Image, Modal, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";

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

interface Props {
	open: boolean;
	setOpen: (value: boolean) => void;
	request: BecomeChefRequest;
}
export const BecomeChefRequestDetailModal: React.FC<Props> = ({ open, request, setOpen }) => {
	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			title="Become Chef Request Detail"
			centered
			width={1100}
		>
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
							<Row className="text-center">
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
							<Row className="text-center">
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
							<Row className="text-center">
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
							<Row className="text-center">
								<Col span={11} xs={24} md={11}>
									<div className="flex items-center space-x-2">
										<Typography className="basis-1/3">Date of birth</Typography>
										<Typography
											className={`basis-2/3 rounded-md border border-gray-300 text-center text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
										>
											{dayjs(request.dob).format("DD-MM-YYYY")}
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
							<Row className="text-center ">
								<Col span={24}>
									<Form.Item label="Experience">
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
							<Row className=" text-center ">
								<Col span={24}>
									<Form.Item label="Achivement">
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
			</div>
		</Modal>
	);
};

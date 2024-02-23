import React from "react";
import { Typography, Upload } from "antd";
import { UploadComponentProps } from "@/types/@override/Upload";
import { handleBeforeUploadFile } from "@/utils/file_exts";

const { Dragger } = Upload;

type DraggerUploadComponentProps = {
	icon: React.ReactNode;
	title: string;
	description?: string;
} & UploadComponentProps;

const DraggerUpload: React.FC<DraggerUploadComponentProps> = ({ ...props }) => (
	<Dragger
		{...props}
		beforeUpload={handleBeforeUploadFile}
		action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
	>
		<p className="!text-gray-500">{props.icon}</p>
		<Typography.Title level={4} className="ant-upload-text">
			{props.title}
		</Typography.Title>
		<p className="ant-upload-hint">{props.description}</p>
	</Dragger>
);

export default DraggerUpload;

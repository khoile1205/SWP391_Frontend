import React from "react";
import { Typography, Upload } from "antd";
import { UploadComponentProps } from "@/types/@override/Upload";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { RcFile } from "antd/es/upload";
import { showToast } from "@/utils/notify";
import fileStore from "@/zustand/file.store";
import { AppConstant } from "@/utils/constant";

const { Dragger } = Upload;

type DraggerUploadComponentProps = {
	icon: React.ReactNode;
	title: string;
	description?: string;
} & UploadComponentProps;

const DraggerUpload: React.FC<DraggerUploadComponentProps> = ({ ...props }) => {
	const { uploadImage } = fileStore((state) => state);
	const customRequest = async ({ file, onSuccess, onError }: any) => {
		try {
			if (!handleBeforeUploadFile(file as RcFile)) {
				onError();
				return;
			}
			showToast("warning", "Uploading image ...");
			const response = await uploadImage(file as RcFile, AppConstant.recipeFolder);

			if (response.isSuccess) {
				const result = response.data;
				showToast("success", "File uploaded successfully");
				onSuccess(result, file);
			} else {
				throw new Error("Failed to upload file");
			}
		} catch (error) {
			console.error(error);
			showToast("error", (error as Error).message);
			onError(error);
		}
	};
	return (
		<Dragger
			{...props}
			beforeUpload={handleBeforeUploadFile}
			customRequest={customRequest}
			accept="image/*"
		>
			<p className="!text-gray-500">{props.icon}</p>
			<Typography.Title level={4} className="ant-upload-text">
				{props.title}
			</Typography.Title>
			<p className="ant-upload-hint">{props.description}</p>
		</Dragger>
	);
};

export default DraggerUpload;

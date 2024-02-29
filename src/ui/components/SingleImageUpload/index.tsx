import React, { useState } from "react";
import { UploadButton } from "..";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { showToast } from "@/utils/notify";
import Upload, { RcFile } from "antd/es/upload";
import fileStore from "@/zustand/file.store";
import { AppConstant } from "@/utils/constant";
import { UploadComponentProps } from "@/types/@override/Upload";

const SingleImageUploadComponent: React.FC<UploadComponentProps & { loading: boolean }> = ({
	...props
}) => {
	const { uploadImage } = fileStore((state) => state);
	const [image, setImage] = useState<string>("");
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
				setImage(result);
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
		<Upload
			accept="image/*"
			className="mt-2"
			customRequest={customRequest}
			listType="picture-card"
			showUploadList={false}
			{...props}
		>
			{image ? <img src={image} alt="avatar" style={{ width: "100%" }}></img> : <UploadButton />}
		</Upload>
	);
};

export { SingleImageUploadComponent };

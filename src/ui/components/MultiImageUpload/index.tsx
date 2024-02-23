import React from "react";
import { Upload } from "antd";
import { UploadButton } from "..";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { UploadComponentProps } from "@/types/@override/Upload";

const MultiImagesUploadComponent: React.FC<UploadComponentProps> = ({ ...props }) => (
	<Upload
		className="mt-2"
		listType="picture-card"
		action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
		beforeUpload={handleBeforeUploadFile}
		{...props}
	>
		<UploadButton />
	</Upload>
);

export { MultiImagesUploadComponent };

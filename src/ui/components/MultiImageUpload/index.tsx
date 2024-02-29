import { UploadButton } from "..";
import { handleBeforeUploadFile } from "@/utils/file_exts";
import { UploadComponentProps } from "@/types/@override/Upload";
import fileStore from "@/zustand/file.store";
import { AppConstant } from "@/utils/constant";
import Upload, { RcFile } from "antd/es/upload";
import { showToast } from "@/utils/notify";

const MultiImagesUploadComponent: React.FC<UploadComponentProps> = ({ ...props }) => {
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
		<Upload
			accept="image/*"
			className="mt-2"
			listType="picture-card"
			customRequest={customRequest}
			{...props}
		>
			<UploadButton />
		</Upload>
	);
};

export { MultiImagesUploadComponent };

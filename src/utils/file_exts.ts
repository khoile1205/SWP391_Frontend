import { RcFile, UploadFile } from "antd/es/upload";
import { showToast } from "./notify";
import { generateRandomString } from "./string.extension";

export const handleBeforeUploadFile = (file: RcFile): Promise<boolean> | boolean => {
	const isPNG =
		file.type === "image/png" ||
		file.type === "image/jpeg" ||
		file.type === "image/jpg" ||
		file.type === "image/webp";

	if (!isPNG) {
		showToast("error", "Please upload a image file");
		return false;
	}

	const isAcceptedFileSize = file.size < 1024 * 1024 * 10;
	if (!isAcceptedFileSize) {
		showToast("error", "Please upload a image file less than 10MB");
		return false;
	}
	return isPNG && isAcceptedFileSize;
};
export const renderUploadedRequestImage = (imageUrls: string[] | undefined): UploadFile[] => {
	if (!imageUrls) {
		return [];
	} else {
		return imageUrls.map((imageUrl) => ({
			uid: generateRandomString(10),
			name: imageUrl,
			status: "done",
			url: imageUrl,
		}));
	}
};

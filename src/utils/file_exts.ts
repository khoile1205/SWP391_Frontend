import { RcFile } from "antd/es/upload";
import { showToast } from "./notify";

export const handleBeforeUploadFile = (file: RcFile) => {
	const isPNG =
		file.type === "image/png" ||
		file.type === "image/jpeg" ||
		file.type === "image/jpg" ||
		file.type === "image/webp";
	if (!isPNG) {
		showToast("error", "Please upload a image file");
	}

	const isAcceptedFileSize = file.size < 1024 * 1024 * 10;
	if (!isAcceptedFileSize) {
		showToast("error", "Please upload a image file less than 10MB");
	}
	return isPNG && isAcceptedFileSize;
};
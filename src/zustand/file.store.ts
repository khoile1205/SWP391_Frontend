import { create } from "zustand";
import Result from "./commons/result";
import { fileUseCase } from "@/usecases";

type FileStore = {
	uploadImage: (file: File, path: string) => Promise<Result>;
};

const fileStore = create<FileStore>(() => ({
	uploadImage: async (file: File, path: string) => {
		const res = await fileUseCase.uploadImage(file, path);
		if (!res.isSuccess) {
			return Result.failed(res.message);
		}
		return Result.success(res.message, res.data);
	},
}));

export default fileStore;

import { create } from "zustand";
import Result from "./commons/result";
import { handleUseCase } from "./commons/handle.usecase";
import { notificationUsecase } from "@/usecases";

type Action = {
	seenAllNotification(): Promise<Result>;
};

export const notificationStore = create<Action>(() => ({
	seenAllNotification: async () => {
		return await handleUseCase(notificationUsecase.seenAllNotification());
	},
}));

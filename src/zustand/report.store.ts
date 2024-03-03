import { ReportTargetType, SendReportDTO } from "@/types/report";
import { reportUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";

type State = {
	type: ReportTargetType;
	open: boolean;
	targetId: string;
};

type Action = {
	sendReport: (report: SendReportDTO) => Promise<Result>;
	setReportModalState: ({
		targetId,
		type,
		open,
	}: {
		targetId?: string;
		type?: ReportTargetType;
		open?: boolean;
	}) => void;
	getUserReport: () => Promise<Result>;
};

export const reportStore = create<State & Action>((set) => ({
	type: "recipe",
	open: false,
	targetId: "",
	sendReport: async (report) => {
		const response = await reportUseCase.sendReport(report);
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
	setReportModalState: ({
		targetId = "",
		type = "recipe",
		open = true,
	}: {
		targetId?: string;
		type?: ReportTargetType;
		open?: boolean;
	}) => {
		// console.log({ targetId, type, open });
		set(() => ({ targetId, type, open }));
	},
	getUserReport: async () => {
		const response = await reportUseCase.getUserReport();
		if (!response.isSuccess) {
			return Result.failed(response.message);
		}
		return Result.success(response.message, response.data);
	},
}));

export type SendReportDTO = {
	type: ReportTargetType;
	targetId: string;
	title: string;
	content: string;
	imageUrls: string[];
};

export type ReportTargetType = "recipe" | "user" | "comment";

export type HandleReportDTO = {
	reportId: string;
	adminAction: number;
	title: string;
	content: string;
};

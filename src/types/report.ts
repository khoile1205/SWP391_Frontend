export type SendReportDTO = {
	type: ReportTargetType;
	targetId: string;
	title: string;
	content: string;
	imageUrls: string[];
};

export type ReportTargetType = "recipe" | "user" | "comment";

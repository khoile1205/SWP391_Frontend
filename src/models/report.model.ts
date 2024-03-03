import { ActionStatus } from "@/enums";
import { ReportType } from "@/enums/report.type.enum";
import { ShortInfoUser } from "@/types/user";

export class Report {
	id: string;
	user: ShortInfoUser;
	targetId: string;
	title: string;
	type: ReportType;
	content: string;
	imageUrls: string[];
	status: ActionStatus;
	createdAt: Date;

	constructor(
		id: string,
		user: ShortInfoUser,
		targetId: string,
		title: string,
		type: ReportType,
		content: string,
		imageUrls: string[],
		status: ActionStatus,
		createdAt: Date
	) {
		this.id = id;
		this.user = user;
		this.targetId = targetId;
		this.title = title;
		this.type = type;
		this.content = content;
		this.imageUrls = imageUrls;
		this.status = status;
		this.createdAt = createdAt;
	}
}

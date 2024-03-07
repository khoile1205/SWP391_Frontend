import { ShortInfoUser } from "@/types/user";

export class Notification {
	id: string;
	sender: ShortInfoUser | null;
	notificationType: string;
	content: string;
	isSeen: boolean;
	createdAt: Date;

	constructor(data: Notification) {
		this.id = data.id;
		this.sender = data.sender;
		this.notificationType = data.notificationType;
		this.content = data.content;
		this.isSeen = data.isSeen;
		this.createdAt = data.createdAt;
	}
}

import { NotificationDatasource } from "@/datasources/notification.datasource";
import Response from "../auth.usecase/responses/response";

export abstract class NotificationUsecase {
	abstract seenAllNotification(): Promise<Response>;
}

export class NotificationUsecaseImpl implements NotificationUsecase {
	private notificationDatasource: NotificationDatasource;

	constructor(notificationDatasource: NotificationDatasource) {
		this.notificationDatasource = notificationDatasource;
	}

	async seenAllNotification(): Promise<Response> {
		return await this.notificationDatasource.seenAllNotification();
	}
}

export type CreateNotificationDTO = {
	senderId: string;
	receiverId: string;
	notificationType: string;
	targetType: string;
	content: string;
};

import { ActionStatus } from "@/enums";

export type BecomeChefRequest = {
	requestChefId: string;
	userID: string;
	fullName: string;
	identityImageUrl: string;
	certificateImageUrls: string[];
	phoneNumber: string;
	gender: string;
	address: string;
	dob: Date;
	category: string;
	email: string;
	experience: string;
	achievement: string;
	status: ActionStatus;
	responseId: null;
	createdAt: string;
};

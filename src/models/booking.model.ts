import { ActionStatus } from "@/enums";
import { ShortInfoUser } from "@/types/user";

export class Booking {
	id: string;
	user: ShortInfoUser;
	chef: ShortInfoUser;
	address: string;
	bookingDishes: BookingRecipes[];
	timeStart: Date;
	timeEnd: Date;
	total: number;
	status: ActionStatus;
	createdAt: Date;
	approvalStatusDate: Date;

	constructor(
		id: string,
		user: ShortInfoUser,
		chef: ShortInfoUser,
		address: string,
		bookingDishes: BookingRecipes[],
		timeStart: Date,
		timeEnd: Date,
		total: number,
		status: ActionStatus,
		createdAt: Date,
		approvalStatusDate: Date
	) {
		this.id = id;
		this.user = user;
		this.chef = chef;
		this.address = address;
		this.bookingDishes = bookingDishes;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.total = total;
		this.status = status;
		this.createdAt = createdAt;
		this.approvalStatusDate = approvalStatusDate;
	}
}

export interface BookingRecipes {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	portion: number;
	bookingPrice: number;
	note: string;
}

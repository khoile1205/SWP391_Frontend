import { TransactionType } from "@/enums/transaction.enum";
import { ShortInfoUser } from "@/types/user";

export class Transaction {
	id: string;
	user: ShortInfoUser;
	type: TransactionType;
	amount: number;
	description: string;
	currency: string;
	payment: string;
	isSuccess: boolean;
	createdAt: Date;
	constructor(
		id: string,
		user: ShortInfoUser,
		type: TransactionType,
		amount: number,
		description: string,
		currency: string,
		isSuccess: boolean,
		payment: string,
		createdAt: Date
	) {
		this.id = id;
		this.user = user;
		this.type = type;
		this.amount = amount;
		this.description = description;
		this.currency = currency;
		this.isSuccess = isSuccess;
		this.payment = payment;
		this.createdAt = createdAt;
	}
}

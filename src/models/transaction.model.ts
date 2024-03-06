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
	createdAt: Date;
	constructor(
		id: string,
		user: ShortInfoUser,
		type: TransactionType,
		amount: number,
		description: string,
		currency: string,
		payment: string,
		createdAt: Date
	) {
		this.id = id;
		this.user = user;
		this.type = type;
		this.amount = amount;
		this.description = description;
		this.currency = currency;
		this.payment = payment;
		this.createdAt = createdAt;
	}
}

import { PaymentType } from "@/enums/payment.type.enum";

export type CreatePaymentDTO = {
	orderType: PaymentType;
	amount: number;
	orderDescription: string;
	name: string;
};

export type WithdrawPaymentDTO = {
	description: string;
	amount: number;
};
export type PurchaseRecipePaymentType = "Wallet" | "VnPay";

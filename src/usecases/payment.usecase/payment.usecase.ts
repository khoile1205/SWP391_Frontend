import { CreatePaymentDTO, PurchaseRecipePaymentType, WithdrawPaymentDTO } from "@/types/payment";
import Response from "../auth.usecase/responses/response";
import { PaymentDatasource } from "@/datasources/payment.datasource";

export abstract class PaymentUsecase {
	abstract topUp(data: CreatePaymentDTO): Promise<Response>;
	abstract handleValidatePaymentCallback(queryString: string): Promise<Response>;
	abstract payRecipe({
		data,
		recipeId,
		typeTransactionId,
	}: {
		data: CreatePaymentDTO;
		recipeId: string;
		typeTransactionId: string;
	}): Promise<Response>;
	abstract withDraw(data: WithdrawPaymentDTO): Promise<Response>;
}

export class PaymentUsecaseImpl implements PaymentUsecase {
	constructor(private readonly paymentDatasource: PaymentDatasource) {}
	async withDraw(data: WithdrawPaymentDTO): Promise<Response> {
		return await this.paymentDatasource.withDraw(data);
	}
	async payRecipe({
		data,
		recipeId,
		typeTransactionId,
	}: {
		data: CreatePaymentDTO;
		recipeId: string;
		typeTransactionId: PurchaseRecipePaymentType;
	}): Promise<Response> {
		return await this.paymentDatasource.payRecipes({
			data,
			recipeId,
			typeTransaction: typeTransactionId,
		});
	}
	async handleValidatePaymentCallback(queryString: string): Promise<Response> {
		return await this.paymentDatasource.handleValidatePaymentCallback(queryString);
	}
	async topUp(data: CreatePaymentDTO): Promise<Response> {
		return await this.paymentDatasource.topUp(data);
	}
}

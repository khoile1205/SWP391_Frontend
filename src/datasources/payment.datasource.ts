import { CreatePaymentDTO, PurchaseRecipePaymentType } from "@/types/payment";
import Response from "@/usecases/auth.usecase/responses/response";
import apiService from "@/utils/apiService";
import AppString from "@/utils/app-string";

export abstract class PaymentDatasource {
	abstract topUp(data: CreatePaymentDTO): Promise<Response>;
	abstract handleValidatePaymentCallback(queryString: string): Promise<Response>;
	abstract payRecipes({
		data,
		recipeId,
		typeTransaction,
	}: {
		data: CreatePaymentDTO;
		recipeId: string;
		typeTransaction: PurchaseRecipePaymentType;
	}): Promise<Response>;
}

export class PaymentDatasourceImpl implements PaymentDatasource {
	async payRecipes({
		data,
		recipeId,
		typeTransaction,
	}: {
		data: CreatePaymentDTO;
		recipeId: string;
		typeTransaction: PurchaseRecipePaymentType;
	}): Promise<Response> {
		// console.log(JSON., recipeId, typeTransaction);
		const response = await apiService.post(
			`/api/purchasedrecipes?typeTransaction=${typeTransaction}&recipeId=${recipeId}`,
			data
		);
		console.log(response);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(isSuccess, null, AppString.createTransactionURLErrorMessage);
		}
		const resBody = await response.json();
		const message = resBody.message;
		return new Response(isSuccess, resBody.result, message);
	}
	async handleValidatePaymentCallback(queryString: string): Promise<Response> {
		const response = await apiService.get(`/api/transaction/callback?${queryString}`);
		console.log(response);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(isSuccess, null, AppString.createTransactionErrorMessage);
		}
		const resBody = await response.json();
		return new Response(isSuccess, resBody.result, AppString.createTransactionSuccessMessage);
	}
	async topUp(data: CreatePaymentDTO): Promise<Response> {
		const response = await apiService.post("/api/transaction/create", data);
		const isSuccess = response.status === 200;
		if (!isSuccess) {
			return new Response(isSuccess, null, AppString.createTransactionURLErrorMessage);
		}
		const resBody = await response.json();
		const message = resBody.message;
		return new Response(isSuccess, resBody.result, message);
	}
}

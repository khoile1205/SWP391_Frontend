import { CreatePaymentDTO, PurchaseRecipePaymentType } from "@/types/payment";
import Result from "./commons/result";
import { create } from "zustand";
import { paymentUsecase } from "@/usecases";

type Action = {
	topUp: (data: CreatePaymentDTO) => Promise<Result>;
	handleValidatePaymentCallback: (queryString: string) => Promise<Result>;
	payRecipe({
		data,
		typeTransaction,
		recipeId,
	}: {
		data: CreatePaymentDTO;
		typeTransaction: string;
		recipeId: string;
	}): Promise<Result>;
};

export const paymentStore = create<Action>(() => ({
	payRecipe: async ({
		data,
		typeTransaction,
		recipeId,
	}: {
		data: CreatePaymentDTO;
		typeTransaction: PurchaseRecipePaymentType;
		recipeId: string;
	}) => {
		const response = await paymentUsecase.payRecipe({
			data,
			typeTransactionId: typeTransaction,
			recipeId,
		});
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		} else {
			return Result.failed(response.message);
		}
	},
	topUp: async (data: CreatePaymentDTO) => {
		const response = await paymentUsecase.topUp(data);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		} else {
			return Result.failed(response.message);
		}
	},
	handleValidatePaymentCallback: async (queryString: string) => {
		const response = await paymentUsecase.handleValidatePaymentCallback(queryString);
		if (response.isSuccess) {
			return Result.success(response.message, response.data);
		} else {
			return Result.failed(response.message);
		}
	},
}));

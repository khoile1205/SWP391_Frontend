import { becomeChefRequestUseCase } from "@/usecases";
import { create } from "zustand";
import Result from "./commons/result";
import {
	CreatedBecomeChefRequestDTO,
	UpdateBecomeChefRequestDTO,
} from "@/types/become-chef-request";
import { BecomeChefRequest } from "@/models/become-chef-request.model";
import AppString from "@/utils/app-string";

type Action = {
	createBecomeChefRequest: (body: CreatedBecomeChefRequestDTO) => Promise<Result>;
	deleteRequestById: (id: string) => Promise<Result>;
	getRequestByUserId: (userId: string) => Promise<Result>;
	updateRequestById: (id: string, body: UpdateBecomeChefRequestDTO) => Promise<Result>;
};

export const becomeChefRequestStore = create<Action>(() => ({
	createBecomeChefRequest: async (body: CreatedBecomeChefRequestDTO) => {
		const response = await becomeChefRequestUseCase.createBecomeChefRequest(body);
		if (response.isSuccess) {
			return Result.success(
				AppString.createdRequestSuccessMessage,
				response.data as BecomeChefRequest
			);
		}
		return Result.failed(response.message);
	},
	deleteRequestById: async (id: string) => {
		const response = await becomeChefRequestUseCase.deleteRequestsById(id);
		if (response.isSuccess) {
			return Result.success(response.message);
		}
		return Result.failed(response.message);
	},
	getRequestByUserId: async (userId: string) => {
		const response = await becomeChefRequestUseCase.getRequestsByUserId(userId);
		if (response.isSuccess) {
			return Result.success(response.message, response.data as BecomeChefRequest);
		}
		return Result.failed(response.message);
	},
	updateRequestById: async (id: string, body: UpdateBecomeChefRequestDTO) => {
		const response = await becomeChefRequestUseCase.updateRequestById(id, body);
		if (response.isSuccess) {
			return Result.success(response.message);
		}
		return Result.failed(response.message);
	},
}));

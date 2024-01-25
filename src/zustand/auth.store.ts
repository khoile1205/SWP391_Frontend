import { create } from "zustand";
import { ResetPasswordData, IdentifierResetPassword, VerifyEmailInformation } from "@/types/auth";
import { authUseCase } from "@/usecases";
import Result from "./commons/result";
import { mergeToken } from "@/utils/string.extension";

type AuthStore = {
	verifyIdentifierResetPassword: (data: IdentifierResetPassword) => Promise<Result>;
	verifyEmailResetPassword: (data: VerifyEmailInformation) => Promise<Result>;
	sendEmailResetPassword: (data: IdentifierResetPassword) => Promise<Result>;
	resetPassword: (data: ResetPasswordData) => Promise<Result>;
	verifyEmailConfirmation: (data: VerifyEmailInformation) => Promise<Result>;
};

const handleUseCase = async (promise: Promise<any>, successMessage?: string) => {
	try {
		const response = await promise;
		return response.isSuccess
			? Result.success(successMessage || response.message, response.data)
			: Result.failed(response.message);
	} catch (error) {
		return Result.failed((error as Error).message);
	}
};

const authStore = create<AuthStore>(() => ({
	verifyIdentifierResetPassword: (data: IdentifierResetPassword) =>
		handleUseCase(authUseCase.verifyIdentifierResetPassword(data)),

	sendEmailResetPassword: (data: IdentifierResetPassword) =>
		handleUseCase(authUseCase.sendEmailResetPassword(data)),

	resetPassword: (data: ResetPasswordData) =>
		handleUseCase(authUseCase.resetPassword({ ...data, token: mergeToken(data.token) })),

	verifyEmailResetPassword: (data: VerifyEmailInformation) =>
		handleUseCase(
			authUseCase.verifyEmailResetPassword({ email: data.email, token: mergeToken(data.token) })
		),

	verifyEmailConfirmation: (data: VerifyEmailInformation) =>
		handleUseCase(
			authUseCase.verifyEmailConfirmation({ email: data.email, token: mergeToken(data.token) })
		),
}));

export default authStore;

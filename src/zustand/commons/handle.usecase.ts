import Result from "./result";

export const handleUseCase = async (promise: Promise<any>, successMessage?: string) => {
	try {
		const response = await promise;
		return response.isSuccess
			? Result.success(successMessage || response.message, response.data)
			: Result.failed(response.message);
	} catch (error) {
		return Result.failed((error as Error).message);
	}
};

import { FileDatasource } from "@/datasources/file.datasource";
import Response from "../auth.usecase/responses/response";
abstract class FileUseCase {
	abstract uploadImage(file: File, path: string): Promise<Response>;
}

class FileUseCaseImpl implements FileUseCase {
	constructor(private readonly fileDatasource: FileDatasource) {}
	async uploadImage(file: File, path: string): Promise<Response> {
		return await this.fileDatasource.uploadImage(file, path);
	}
}

export { FileUseCaseImpl, FileUseCase };

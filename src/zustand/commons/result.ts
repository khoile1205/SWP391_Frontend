class Result {
	private _isSuccess: boolean;
	public message?: string;

	private constructor(isSuccess: boolean, message?: string) {
		this._isSuccess = isSuccess;
		this.message = message;
	}

	static success(message?: string) {
		return new Result(true, message);
	}

	static failed(message: string) {
		return new Result(false, message);
	}

	get isSuccess() {
		return this._isSuccess;
	}
}

export default Result;

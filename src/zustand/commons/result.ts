class Result {
	private _isSuccess: boolean;
	public message?: string;
	public data?: any;

	private constructor(isSuccess: boolean, message?: string, data?: any) {
		this._isSuccess = isSuccess;
		this.message = message;
		this.data = data;
	}

	static success(message?: string, data?: any) {
		return new Result(true, message, data);
	}

	static failed(message: string) {
		return new Result(false, message);
	}

	get isSuccess() {
		return this._isSuccess;
	}
}

export default Result;

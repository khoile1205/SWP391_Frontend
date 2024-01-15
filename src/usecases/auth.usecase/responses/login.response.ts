class LoginResponse {
	constructor(
		public readonly isSuccess: boolean,
		public readonly token: string,
		public readonly message: string
	) {}
}

export default LoginResponse;
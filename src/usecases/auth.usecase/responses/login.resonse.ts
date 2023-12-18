class LoginResonse {
	constructor(
		public readonly isSuccess: boolean,
		public readonly token: string,
		public readonly message: string
	) {}
}

export default LoginResonse;

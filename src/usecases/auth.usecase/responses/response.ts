class Response {
	constructor(
		public readonly isSuccess: boolean,
		public readonly data: Record<string, any> | null,
		public readonly message: string
	) {}
}

export default Response;

import { AuthUseCase } from "../../src/usecases/auth.usecase/auth.usecase";
import { AuthDataSource } from "../../src/datasources/auth.datasource";

// Create a concrete class that extends the abstract class
class MockAuthDataSource implements AuthDataSource {
	async login(_email: string, _password: string): Promise<void> {
		// Do nothing
	}
}

describe("AuthUseCase", () => {
	let authUseCase: AuthUseCase;
	let mockAuthDataSource: MockAuthDataSource;

	beforeEach(() => {
		// Create an instance of the concrete class
		mockAuthDataSource = new MockAuthDataSource();
		authUseCase = new AuthUseCase(mockAuthDataSource);
	});

	test("Should call login method on AuthDataSource with correct parameters", async () => {
		const email = "chiemdu@gmail.com";
		const password = "123456Aa@";

		// Spy on the login method of the concrete class
		const loginSpy = jest.spyOn(mockAuthDataSource, "login");

		await authUseCase.login(email, password);

		// Check if the login method was called with the correct parameters
		expect(loginSpy).toHaveBeenCalledWith(email, password);
	});

	test("Should handle empty email or password", async () => {
		const emptyEmail = "";
		const emptyPassword = "";

		// The use case should return an failed Login Response empty email or password
		const loginResponse = await authUseCase.login(emptyEmail, emptyPassword);
		expect(loginResponse.isSuccess).toBe(false);
	});

	test("Should handle failed case validate email and password", async () => {
		const email = "nguyenchiemdule@gmail.com";
		const password = "111111";

		// The use case should return an failed Login Response invalid email or password
		const loginResponse = await authUseCase.login(email, password);
		expect(loginResponse.isSuccess).toBe(false);
	});
});

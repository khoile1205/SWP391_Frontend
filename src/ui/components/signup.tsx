import router from "@/routes";
import userStore from "@/zustand/user.store";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

let email = "nguyenchiemdu@gmail.com";
let password = "123456Aa@";

export default function SignUp() {
	const { error, login } = userStore();
	const [show, updateVisiblePass] = useState(false);
	const { t } = useTranslation();

	const handleLogin = async (email: string, password: string) => {
		const loginResult = await login(email, password);

		if (loginResult.isSuccess) {
			router.navigate("/");
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						<h2>{t("Welcome to React")}</h2>
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									defaultValue={email}
									onChange={(e) => (email = e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="flex mt-2">
								<input
									id="password"
									name="password"
									type={!show ? "password" : "text"}
									autoComplete="current-password"
									defaultValue={password}
									onChange={(e) => (password = e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
								/>

								{show ? (
									<button
										type="button"
										className="relative p-1 text-primary-600"
										onClick={() => updateVisiblePass(false)}
									>
										<EyeSlashIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								) : (
									<button
										type="button"
										className="relative p-1 text-primary-600"
										onClick={() => updateVisiblePass(true)}
									>
										<EyeIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								)}
							</div>
							<label
								htmlFor="text"
								className={`block text-sm pt-2 font-medium leading-6 text-red-500 ${
									!error && "opacity-0"
								}`}
							>
								{error ? error.message : "Error default string"}
							</label>
						</div>

						<div>
							<button
								type="button"
								onClick={() => handleLogin(email, password)}
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<a href="#" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
							Start a 14 day free trial
						</a>
					</p>
				</div>
			</div>
		</>
	);
}

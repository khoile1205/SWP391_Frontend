import useEmailVerification from "@/hooks/useEmailVerification";
import AppString from "@/utils/app-string";
import { Typography } from "antd";

export default function VerifyEmail() {
	const isVerified = useEmailVerification();
	return (
		<div className="mx-auto flex-1 flex-col justify-center space-y-10  px-6 py-12 lg:px-8">
			<Typography className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
				Email Confirmation
			</Typography>
			<Typography className="text-center text-lg text-xl font-bold leading-9 tracking-tight text-gray-900">
				{isVerified ? (
					<>
						Thanks for your confirmation, your email has been verified successfully.
						<a href="/sign-in" className="!hover:text-gray-100 ">
							{" "}
							Click here
						</a>{" "}
						to sign in
					</>
				) : (
					AppString.emailConfirmationError
				)}
			</Typography>
		</div>
	);
}

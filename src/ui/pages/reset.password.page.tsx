import useResetPasswordVerification from "@/hooks/auth/useForgotPasswordVerification";
import Step1ResetPassword from "../section/step-1.reset-password";
import Step2ResetPassword from "../section/step-2.reset-password";

export default function ResetPasswordPage() {
	const { isVerified, email, token } = useResetPasswordVerification();

	return !isVerified ? (
		<Step1ResetPassword />
	) : (
		<Step2ResetPassword token={token!} email={email!} />
	);
}

import authStore from "@/zustand/auth.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useResetPasswordVerification = () => {
	const { search } = useLocation();
	const { verifyEmailResetPassword } = authStore((state) => state);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	useEffect(() => {
		const params = new URLSearchParams(search);
		const token = params.get("token");
		const email = params.get("email");

		if (!token || !email) {
			setIsVerified(false);
		} else {
			verifyEmailResetPassword({ email, token }).then((response) =>
				setIsVerified(response.isSuccess)
			);
		}

		setToken(token);
		setEmail(email);
	}, [search, verifyEmailResetPassword]);

	return { isVerified, email, token };
};

export default useResetPasswordVerification;

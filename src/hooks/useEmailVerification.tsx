import authStore from "@/zustand/auth.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useEmailVerification = () => {
	const { search } = useLocation();
	const [isVerified, setVerified] = useState<boolean>(false);
	const { verifyEmailConfirmation } = authStore((state) => state);

	useEffect(() => {
		const params = new URLSearchParams(search);
		const token = params.get("token");
		const email = params.get("email");
		const fetchData = async () => {
			const response = await verifyEmailConfirmation({ email: email!, token: token! });
			setVerified(response.isSuccess);
		};
		fetchData();
	});

	return isVerified;
};

export default useEmailVerification;

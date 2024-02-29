import authStore from "@/zustand/auth.store";
import { useLoadingStore } from "@/zustand/loading.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useEmailVerification = () => {
	const [isVerified, setVerified] = useState<boolean>(false);
	const { search } = useLocation();
	const { isLoading, setLoading } = useLoadingStore((state) => state);
	const { verifyEmailConfirmation } = authStore((state) => state);

	useEffect(() => {
		setLoading(true);
		const params = new URLSearchParams(search);
		const token = params.get("token");
		const email = params.get("email");

		const fetchData = async () => {
			const response = await verifyEmailConfirmation({ email: email!, token: token! });
			setVerified(response.isSuccess);
			setLoading(false);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isLoading, isVerified };
};

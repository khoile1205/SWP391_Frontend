// import apiService from "@/utils/apiService";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

const useForgotPasswordVerification = () => {
	// const { search } = useLocation();
	const [isVerified] = useState<boolean>(false);

	useEffect(() => {
		// const params = new URLSearchParams(search);
		// const token = params.get("token");
		// const email = params.get("email");
		const fetchData = async () => {
			// const response = await apiService.post("/api/auth/reset-password", {});
			console.log("z");
		};
		fetchData();
	});

	return isVerified;
};

export default useForgotPasswordVerification;

import { showToast } from "@/utils/notify";
import { paymentStore } from "@/zustand/payment.store";
import { useQuery } from "@tanstack/react-query";

export const useValidatePayment = () => {
	const { handleValidatePaymentCallback } = paymentStore((state) => state);
	const queryParams = new URLSearchParams(window.location.search);
	const { data } = useQuery({
		queryKey: ["validatePaymentCallback", queryParams.toString()],
		queryFn: async () => {
			const result = await handleValidatePaymentCallback(queryParams.toString());
			if (result.isSuccess && result.data.success == true) {
				showToast("success", "Transaction Success");
			} else {
				showToast("error", "Transaction Failed");
			}
			return result;
		},
		retry: false,
		retryDelay: 0,
	});

	return { transactionData: data };
};

import { toast } from "react-toastify";

type statusToast = "success" | "error" | "loading" | "info" | "warning";

export const showToast = (status: statusToast, message: string) => {
	if (status == "success")
		toast.success(message, {
			className: "toast-success",
		});
	if (status === "error")
		toast.error(message, {
			className: "toast-error",
			toastId: message,
		});
	if (status === "loading") toast.loading(message, {});
	if (status === "info") toast.info(message, {});
	if (status === "warning") toast.warning(message, {});
};

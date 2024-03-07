import { HandleReportDTO } from "@/types/report";
import { showToast } from "@/utils/notify";
import { adminStore } from "@/zustand/admin.store";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReports = () => {
	const { getAllReports, handleReport } = adminStore((state) => state);

	const { data: reportData, refetch } = useQuery({
		queryKey: ["adminReport"],
		queryFn: async () => {
			return (await getAllReports()).data;
		},
		retry: 0,
		retryDelay: 0,
	});

	const handleAdminReport = async (data: HandleReportDTO) => {
		const response = await handleReport(data);
		if (response.isSuccess) {
			showToast("success", "Successfully");
			refetch();
		} else {
			showToast("error", "Error when handling report");
		}
	};
	return {
		reportData: reportData || [],
		handleAdminReport,
	};
};

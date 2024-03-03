import { Report } from "@/models/report.model";
import { reportStore } from "@/zustand/report.store";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const useGetUserReports = () => {
	const [reports, setReports] = useState<Report[]>([]);
	const { getUserReport } = reportStore((state) => state);
	// Fetch report by user ID
	const fetchReport = async () => {
		const response = await getUserReport();
		if (response.isSuccess) {
			console.log(response);
			setReports(response.data);
		}
	};

	useEffectOnce(() => {
		fetchReport();
	});
	return { reports };
};

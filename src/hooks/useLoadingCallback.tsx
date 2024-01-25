import { useLoadingStore } from "@/zustand/loading.store";
import { useCallback } from "react";

const useLoadingCallback = (callback: () => Promise<void>, delay: number) => {
	const { setLoading } = useLoadingStore((state) => state);
	const execute = useCallback(() => {
		setLoading(true);
		callback().finally(() => {
			const timeoutId = setTimeout(() => {
				setLoading(false);
			}, delay);
			return () => clearTimeout(timeoutId);
		});
	}, [setLoading, callback, delay]);

	return execute;
};

export default useLoadingCallback;

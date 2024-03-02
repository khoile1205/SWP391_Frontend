import { useLoadingStore } from "@/zustand/loading.store";
import { useCallback, useEffect } from "react";

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

const useLoadingCallbackWithFormik = <T, U>(callback: (arg: T) => Promise<U>, delay: number) => {
	const { setLoading } = useLoadingStore((state) => state);

	const execute = useCallback(
		(arg: T) => {
			setLoading(true);
			callback(arg).finally(() => {
				const timeoutId = setTimeout(() => {
					setLoading(false);
				}, delay);

				// Cleanup function should be returned here
				return () => clearTimeout(timeoutId);
			});
		},
		[setLoading, callback, delay]
	);

	// Instead of returning execute directly, use useEffect to clear the loading state on component unmount
	useEffect(() => {
		return () => {
			// Clear loading state when component unmounts
			setLoading(false);
		};
	}, [setLoading]);

	return execute;
};
export { useLoadingCallback, useLoadingCallbackWithFormik };

import React from "react";
import AppString from "@/utils/app-string";
import { showToast } from "@/utils/notify";
import userStore from "@/zustand/user.store";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type CallbackFunction<T extends any[] = []> = (...args: T) => Promise<any>;

export const useAuthenticateFeature = <T extends any[] = []>(callback: CallbackFunction<T>) => {
	const { user } = userStore((state) => state);
	const navigate = useNavigate();

	const execute = useCallback(
		async (...args: T) => {
			try {
				if (!user) {
					showToast("error", AppString.authorizeFeatureRequiredErrorMessage);
					navigate("/sign-in");
					return;
				}
				const result = await callback(...args);
				return result;
			} catch (error) {
				console.error(error);
				showToast("error", (error as Error).message);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[callback]
	);

	return React.useMemo(() => execute, [execute]);
};

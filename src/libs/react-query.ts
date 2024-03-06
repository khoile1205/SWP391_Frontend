export const defaultConfig = {
	defaultOptions: {
		queries: {
			retry: false,
			retryDelay: 0,
			staleTime: 3 * 60 * 1000,
			cacheTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
		},
	},
};

import React from "react";

// ** Import tanstack
import { defaultConfig } from "./react-query";
import { QueryClientProvider as Provider, QueryClient } from "@tanstack/react-query";

// ** Import query config

const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
	const [queryClient] = React.useState(() => new QueryClient(defaultConfig));

	return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;

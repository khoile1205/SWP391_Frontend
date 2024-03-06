import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/css/index.css";
import App from "./App";
import "reflect-metadata";
import QueryClientProvider from "./libs/query-client-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

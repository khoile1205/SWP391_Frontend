import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/css/index.css";
import App from "./App";
import "reflect-metadata";
import QueryClientProvider from "./libs/query-client-provider";
import ReactGA from "react-ga4";

ReactGA.initialize("G-G0WE49QVVW");

ReactGA.send({
	hitType: "pageView",
	page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

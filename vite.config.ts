import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePluginRadar } from "vite-plugin-radar";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePluginRadar({ analytics: { id: "G-G0WE49QVVW" } })],
	server: {
		port: 3000,
		watch: {
			usePolling: true,
		},
	},
	base: "/",
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
	build: {
		outDir: "./dist/",
	},
});

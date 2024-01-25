import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// https: true,
		port: 3000,
	},
	base: "",
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
});

/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			primary: colors.indigo,
			gray: colors.gray,
			black: colors.black,
			white: "#ffffff",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};

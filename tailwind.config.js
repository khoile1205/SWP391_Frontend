import colors from "tailwindcss/colors";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				playfair: ["Playfair Display", "serif"],
				inter: ["Inter", "sans-serif"],
			},
		},
		colors: {
			primary: colors.indigo,
			gray: colors.gray,
			black: colors.black,
			white: "#ffffff",
			red: colors.red,
		},
	},
	plugins: [require("@tailwindcss/forms")],
};

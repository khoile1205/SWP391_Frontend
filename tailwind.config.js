import colors from "tailwindcss/colors";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			playfair: ["Playfair Display", "serif"],
			inter: ["Inter", "sans-serif"],
		},
		colors: {
			primary: colors.amber, // Set primary color to #ff642f
			gray: colors.gray,
			black: colors.black,
			white: "#ffffff",
			red: colors.red,
		},
	},
	plugins: [require("@tailwindcss/forms")],
};

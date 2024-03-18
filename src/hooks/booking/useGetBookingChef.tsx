import React from "react";

import PastaImage from "@/assets/Icon/pasta.jpg";

const chefs = [
	{
		id: "1",
		userName: "Chef A",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "1",
				title: "Spaghetti Carbonara",
				description: "Delicious pasta dish with bacon, eggs, and cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "2",
				title: "Grilled Salmon",
				description: "Tender grilled salmon with a flavorful marinade.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "3",
				title: "Tiramisu",
				description:
					"Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: 10,
	},
	{
		id: "2",
		userName: "Chef B",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "4",
				title: "Chicken Alfredo",
				description: "Creamy pasta dish with grilled chicken and parmesan cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "5",
				title: "Beef Wellington",
				description:
					"Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: 10,
	},
	{
		id: "3",
		userName: "Chef C",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "6",
				title: "Margherita Pizza",
				description: "Traditional Italian pizza topped with tomatoes, mozzarella, and basil.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "7",
				title: "Risotto",
				description:
					"Creamy Italian rice dish cooked with broth until it reaches a smooth consistency.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: 10,
	},
	{
		id: "4",
		userName: "Chef D",
		avatarURL: "https://example.com/avatarD.jpg",
		recipes: [
			{
				id: "8",
				title: "Lasagna",
				description: "Classic Italian pasta dish made with layers of pasta, meat, and cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "9",
				title: "Caprese Salad",
				description:
					"Simple Italian salad made with fresh tomatoes, mozzarella, basil, and olive oil.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: 10,
	},
	{
		id: "5",
		userName: "Chef E",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "10",
				title: "Panna Cotta",
				description: "Delicate Italian dessert made with sweetened cream and gelatin.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "11",
				title: "Bruschetta",
				description:
					"Italian appetizer consisting of grilled bread topped with tomatoes, basil, and garlic.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: 10,
	},
];
export const useGetBookingChef = () => {
	const [data] = React.useState(chefs);

	return { chefs: data };
};

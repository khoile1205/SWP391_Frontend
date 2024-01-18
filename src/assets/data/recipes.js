export const RECIPES = [
	{
		id: "recipe1",
		cookingTime: 30,
		portion: 4,
		category: ["Italian", "Pasta"],
		ingredients: ["300g pasta", "2 cups tomato sauce", "1/2 cup Parmesan cheese"],
		instructors: [
			{
				id: "instructor1",
				recipeId: "recipe1",
				description: "Chef Maria",
				image: ["maria_image.jpg"],
			},
		],
		createdAt: "2024-01-15T14:00:00Z",
		updatedAt: "2024-01-15T14:30:00Z",
	},
	{
		id: "recipe2",
		cookingTime: 45,
		portion: 8,
		category: ["Dessert", "Vegan"],
		ingredients: ["2 cups all-purpose flour", "1 cup cocoa powder", "1 cup almond milk"],
		instructors: [
			{
				id: "instructor2",
				recipeId: "recipe2",
				description: "Chef Alex",
				image: ["alex_image.jpg"],
			},
		],
		createdAt: "2024-01-15T12:00:00Z",
		updatedAt: "2024-01-15T12:45:00Z",
	},
];

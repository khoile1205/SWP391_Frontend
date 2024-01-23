import { Post } from "@/models/post.model";

export const POSTS: Post[] = [
	{
		id: "post1",
		userId: "user1",
		title: "Delicious Pasta",
		description: "A mouthwatering pasta recipe with homemade sauce.",
		thumbnail:
			"https://www.foodandwine.com/thmb/97PY4E6Wk95IYv1_8pDZvBEi0Uw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cream-tomato-rigatoni-FT-RECIPE1020-139fb3fa52574e8bb06f98e7fa3e4f1e.jpg",
		isPrivate: false,
		price: 9.99,
		rating: 4.5,
		recipeId: "recipe1",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "post2",
		userId: "user2",
		title: "Vegan Chocolate Cake",
		description: "Indulge in the rich and moist vegan chocolate cake.",
		thumbnail:
			"https://assets.epicurious.com/photos/62267969331e011ab6fc25a6/3:2/w_6948,h_4632,c_limit/VeganCocolateCake_RECIPE_030322_28992.jpg",
		isPrivate: true,
		price: 12.99,
		rating: 5.0,
		recipeId: "recipe2",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "post3",
		userId: "user3",
		title: "Spicy Tacos",
		description: "Enjoy the fiery flavors of these spicy tacos.",
		thumbnail:
			"https://res.cloudinary.com/general-mills/image/upload/q_auto,f_auto/readyplansave/wp-content/uploads/2019/04/Caliente-Beef-Spicy-Tacos_706x503.jpg",
		isPrivate: false,
		price: 8.99,
		rating: 4.2,
		recipeId: "recipe4",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "post4",
		userId: "user4",
		title: "Refreshing Smoothie",
		description: "Quench your thirst with this refreshing smoothie.",
		thumbnail:
			"https://dairyfarmersofcanada.ca/sites/default/files/styles/card_large/public/image_file_browser/conso_recipe/2019/iStock-995358886_1182x788.jpg?itok=uV20Dl07",
		isPrivate: false,
		price: 6.99,
		rating: 4.8,
		recipeId: "recipe5",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "post5",
		userId: "user5",
		title: "Savory Pizza",
		description: "Enjoy a delicious and cheesy pizza with your favorite toppings.",
		thumbnail:
			"https://www.heinens.com/wp-content/uploads/2019/09/Savory-Pear-Pizza_Header_800x550.jpg",
		isPrivate: false,
		price: 10.99,
		rating: 4.7,
		recipeId: "recipe6",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "post6",
		userId: "user6",
		title: "Creamy Soup",
		description: "Warm up with a comforting bowl of creamy soup.",
		thumbnail:
			"https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
		isPrivate: false,
		price: 7.99,
		rating: 4.4,
		recipeId: "recipe7",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export default POSTS;

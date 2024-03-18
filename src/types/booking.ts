export type CreateBookingDTO = {
	chefId: string;
	address: string;
	timeStart: Date;
	timeEnd: Date;
	listItems: {
		recipeId: string;
		quantity: number;
	}[];
	note: string;
	total: number;
};

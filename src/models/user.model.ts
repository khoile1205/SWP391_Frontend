interface User {
	id?: string;
	email: string;
	first_name: string;
	last_name: string;
	is_male: boolean;
	phone_number: string | null;
	avatar_url: string | null;
	// BookingPrice: number | null;
	// PhoneNumber: string | null;
	// createdAt: Date;
	// updatedAt: Date;
}

export type { User };
// export { getDefaultUserFields };

import { Roles } from "@/enums";

interface User {
	id: string;
	userName: string;
	firstName: string;
	lastName: string;
	isMale: boolean;
	phoneNumber: string | null;
	address: string | null;
	avatarUrl: string | null;
	bookingPrice: number | null;
	createdAt: string;
	updatedAt: string;
	role: Roles;
}

export type { User };
// export { getDefaultUserFields };

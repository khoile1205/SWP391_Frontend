interface User {
	id?: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

function getDefaultUserFields() {
	const now = new Date();
	return {
		createdAt: now,
		updatedAt: now,
	};
}

export type { User };
export { getDefaultUserFields };

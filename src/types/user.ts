export type ChangePasswordType = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export type UpdateUserInformationType = {
	userName: string;
	firstName: string;
	lastName: string;
	isMale: boolean;
	address: string;
	avatarUrl: string;
};

export type ShortInfoUser = {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
};

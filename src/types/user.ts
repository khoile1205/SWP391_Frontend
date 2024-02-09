export enum Roles {
	USER = "user",
	ADMIN = "admin",
	CHEF = "chef",
}

export enum Gender {
	MALE = "male",
	FEMALE = "female",
}

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
};

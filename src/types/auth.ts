import { ReactElement } from "react";

export interface SignUpInformation {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface SignInInformation {
	username: string;
	password: string;
	isRemember: boolean;
}

export interface VerifyEmailInformation {
	email: string;
	token: string;
}
export interface IdentifierResetPassword {
	identifier: string;
}
export interface ResetPasswordData {
	email: string;
	token: string;
	newPassword: string;
	confirmPassword: string;
}
export type AuthGuards = {
	children: ReactElement | null;
};

export type OAuth2SignInData = {
	accessToken: string;
};

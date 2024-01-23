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
export type AuthGuards = {
	children: ReactElement | null;
};

import { User } from "@/models/user.model";
import React from "react";

interface UserCardProps {
	user: User;
}
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
	return <div>{user.address}</div>;
};

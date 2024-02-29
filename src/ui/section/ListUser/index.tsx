import { User } from "@/models/user.model";
import { UserCard } from "@/ui/components/UserCard";
import React from "react";

interface ListUserProps {
	listUsers: User[];
}
export const ListUser: React.FC<ListUserProps> = ({ listUsers }) => {
	console.log(listUsers);
	return (
		<div className="md:grid md:grid-cols-3 md:gap-4">
			{listUsers.map((user) => (
				<UserCard user={user} key={user.id}></UserCard>
			))}
		</div>
	);
};

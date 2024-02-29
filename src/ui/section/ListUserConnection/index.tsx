import { User } from "@/models/user.model";
import { UserConnectionCard } from "@/ui/components/UserConnectionCard";
import React from "react";

interface UserListSectionProps {
	listUsers: User[];
}
export const ListUserConnection: React.FC<UserListSectionProps> = ({ listUsers }) => {
	return (
		<div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
			{listUsers.map((user) => (
				<UserConnectionCard userConnection={user} key={user.id}></UserConnectionCard>
			))}
		</div>
	);
};

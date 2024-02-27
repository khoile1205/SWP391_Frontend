import { Roles } from "@/enums";
import { User } from "@/models/user.model";
import ForbiddenPage from "@/ui/pages/forbidden.page";
import userStore from "@/zustand/user.store";
import { useEffect, useState } from "react";
import { RouteProps } from "react-router-dom";

type RBACRoutesProps = {
	children: JSX.Element;
	allowedRoles: Roles[];
} & RouteProps;

const RBACRoutes: React.FC<RBACRoutesProps> = ({ children, allowedRoles }) => {
	const { user, loading } = useUserData();

	const isAllowedToAccess = useAccessControl(allowedRoles, user);

	if (loading) {
		// You might want to render a loading spinner or placeholder here
		return <p>Loading...</p>;
	}
	return isAllowedToAccess ? children : <ForbiddenPage></ForbiddenPage>;
};

// Access control logic with dependency injection
const useAccessControl = (allowedRoles: Roles[], user: User | null) => {
	return user && allowedRoles.includes(user.role);
};

// User data and loading logic
const useUserData = () => {
	const { user, getUserProfile } = userStore((state) => state);
	const [loading, setLoading] = useState(!user);

	useEffect(() => {
		const fetchData = async () => {
			await getUserProfile();
			setLoading(false);
		};

		if (!user) {
			fetchData();
		}
	}, [user, getUserProfile]);

	return { user, loading };
};

export default RBACRoutes;

import ForbiddenPage from "@/ui/pages/forbidden.page";
import userStore from "@/zustand/user.store";
import { RouteProps } from "react-router-dom";

type ProtectedRoutesProps = {
	children: JSX.Element;
} & RouteProps;

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const { user } = userStore((state) => state);

	return user ? <ForbiddenPage /> : children;
};

export default ProtectedRoutes;

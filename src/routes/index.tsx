import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import UserRoutes from "./UserRouter";
import AdminRoutes from "./AdminRoutes";

// Set up routes
export default function ThemeRoutes() {
	return useRoutes([...MainRoutes, ...UserRoutes, ...AdminRoutes]);
}

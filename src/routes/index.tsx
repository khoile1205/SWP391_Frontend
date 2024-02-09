import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import UserRoutes from "./UserRouter";

// Set up routes
export default function ThemeRoutes() {
	return useRoutes([...MainRoutes, ...UserRoutes]);
}

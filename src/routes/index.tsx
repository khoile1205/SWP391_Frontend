import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";

// Set up routes
export default function ThemeRoutes() {
	return useRoutes([...MainRoutes]);
}

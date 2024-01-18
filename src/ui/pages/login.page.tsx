import { withAuthRedirect } from "@/HOC/withAuthRedirect";
import Login from "../components/sign-in";

function LoginPage() {
	return (
		<>
			<Login />
		</>
	);
}

const LoginWithAuthRedirect = withAuthRedirect(LoginPage);
export { LoginWithAuthRedirect, LoginPage };

import { SignIn } from "@/components/auth/signin-button";
import { alreadyLoggedIn } from "@/util/sessionUtil";

export default async function Login() {
	await alreadyLoggedIn();

	return <SignIn />;
}

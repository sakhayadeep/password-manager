import { SignIn } from "@/components/auth/signin-button";
import Image from "next/image";
import { alreadyLoggedIn } from "@/util/sessionUtil";

export default async function Login() {
	await alreadyLoggedIn();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
			<Image
				src="/logo_transparent.png"
				alt=""
				width={100}
				height={100}
				className="w-48 m-3"
			/>
			<SignIn />
		</div>
	);
}

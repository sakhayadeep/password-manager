import { alreadyLoggedIn } from "@/util/sessionUtil";
import Link from "next/link";

export default async function Home() {
	await alreadyLoggedIn();

	return (
		<>
			<Link href="/account/login">Sign In</Link>
		</>
	);
}

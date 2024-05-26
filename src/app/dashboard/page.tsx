import Link from "next/link";
import { SignOut } from "@/components/auth/signout-button";
import { LoginItems } from "@/components/dashboard";
import { getAllLoginObjects } from "@/util/mongodb/connect";
import { loginIsRequired } from "@/util/sessionUtil";

export default async function Home() {
	const user = await loginIsRequired();
	const items = await getAllLoginObjects(user.email as string);
	return (
		<>
			<Link href="/create-item">Add new login</Link>
			<SignOut />
			<LoginItems items={items} />
		</>
	);
}

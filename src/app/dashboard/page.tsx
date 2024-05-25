import Link from "next/link";
import { SignOut } from "@/components/auth/signout-button";

export default async function Home() {
	const loginItems = [
		{
			id: "1",
			site: "gmail",
		},
		{
			id: "2",
			site: "facebook",
		},
	];
	return (
		<>
			<ul>
				{loginItems.map((item) => (
					<li key={item.id}>
						<Link href={`/item/${item.id}`}>{item.site}</Link>
					</li>
				))}
			</ul>
			<div>
				<SignOut />
			</div>
		</>
	);
}

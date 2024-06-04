import Link from "next/link";
import { SignOut } from "@/components/auth/signout-button";
import { LoginItems } from "@/components/dashboard/loginItems";
import { getAllLoginObjects } from "@/util/mongodb/connect";
import { loginIsRequired } from "@/util/sessionUtil";
import Image from "next/image";
import { Add } from "@/components/ui-elements/icons";

export default async function Home() {
	const user = await loginIsRequired();
	const items = await getAllLoginObjects(user.email as string);
	return (
		<div className="w-full flex justify-center my-2">
			<div className="w-4/5">
				<div className="flex flex-wrap justify-between w-full">
					<div className="flex m-2">
						<Image
							className="rounded-md bg-gray-50"
							src={user?.image ?? "/"}
							alt="profile picture"
							width={32}
							height={32}
						/>
						<p className="m-1 ml-2">{user?.name ?? "user"}</p>
					</div>
					<div className="flex justify-between">
						<Link
							className="h-fit ml-1 mt-1 text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
							href="/create-item"
						>
							<Add />
						</Link>
						<SignOut />
					</div>
				</div>
				<LoginItems items={items} />
			</div>
		</div>
	);
}

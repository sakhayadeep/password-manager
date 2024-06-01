"use client";
import Link from "next/link";
import { LoginItemsInterface } from "@/app/dashboard/dashboard.type";

export function LoginItems({
	items,
}: Readonly<{ items: LoginItemsInterface[] }>) {
	return (
		<ul className="divide-y divide-gray-100">
			{items.map((item) => (
				<li key={item._id} className="flex justify-between gap-x-6 py-5">
					<Link href={`/login-item?q=${item._id}`}>
						<div className="flex min-w-0 gap-x-4">
							{/* <img
								className="h-12 w-12 flex-none rounded-full bg-gray-50"
								src={person.imageUrl}
								alt=""
							/> */}
							<div className="min-w-0 flex-auto">
								<p className="font-semibold leading-6 \">{item.website}</p>
								<p className="mt-1 truncate text-xs leading-5">
									{item.username}
								</p>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}

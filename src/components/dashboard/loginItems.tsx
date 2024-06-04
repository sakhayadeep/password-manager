"use client";
import Link from "next/link";
import { LoginItemsInterface } from "@/app/dashboard/dashboard.type";
import Search from "@/components/dashboard/search";
import { useState } from "react";
import Item from "./item";

export function LoginItems({
	items,
}: Readonly<{ items: LoginItemsInterface[] }>) {
	const [displayItems, setDisplayItems] =
		useState<LoginItemsInterface[]>(items);

	if (items.length === 0) {
		return (
			<div className="w-full h-svh flex justify-center mt-2">
				<div className="w-4/5 h-full text-center content-center">
					Add passwords to see.
				</div>
			</div>
		);
	}
	return (
		<div className="mb-2 mt-4">
			<Search items={items} setItems={setDisplayItems} />
			<ul className="divide-y divide-gray-100 mt-2">
				{displayItems.map((item) => (
					<li key={item._id} className="flex justify-between gap-x-6 py-5">
						<Link href={`/login-item?q=${item._id}`}>
							<Item item={item} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

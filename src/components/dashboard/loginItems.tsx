"use client";
import Link from "next/link";
import { LoginItemsInterface } from "@/app/dashboard/dashboard.type";
import Image from "next/image";
import Search from "@/components/dashboard/search";
import { useState } from "react";

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
		<>
			<Search items={items} setItems={setDisplayItems} />
			<ul className="divide-y divide-gray-100 mt-2">
				{displayItems.map((item) => (
					<li key={item._id} className="flex justify-between gap-x-6 py-5">
						<Link href={`/login-item?q=${item._id}`}>
							<div className="flex min-w-0 gap-x-4 items-center">
								<Image
									className="rounded-full bg-gray-50"
									src={`${item.website}/favicon.ico`}
									alt={`${item.website} icon`}
									width={32}
									height={32}
								/>
								<div className="min-w-0 flex-auto">
									<p className="font-semibold leading-6">
										{item.website?.split("://")?.[1]}
									</p>
									<p className="mt-1 truncate text-xs leading-5">
										{item.username}
									</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

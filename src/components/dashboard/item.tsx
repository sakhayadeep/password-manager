import Image from "next/image";
import { LoginItemsInterface } from "@/app/dashboard/dashboard.type";
import { useState } from "react";

export default function Item({
	item,
}: Readonly<{ item: LoginItemsInterface }>) {
	const [imgSrc, setImgSrc] = useState<string>(
		`https://icons.duckduckgo.com/ip3/${item?.website?.split("://")?.[1]}.ico`
	);
	return (
		<div className="flex min-w-0 gap-x-4 items-center">
			<Image
				className="rounded-full bg-gray-50"
				src={imgSrc}
				alt={`${item.website} icon`}
				width={32}
				height={32}
				onError={() => {
					setImgSrc("/icons_website.png");
				}}
			/>
			<div className="min-w-0 flex-auto">
				<p className="font-semibold leading-6">
					{item.website?.split("://")?.[1]}
				</p>
				<p className="mt-1 truncate text-xs leading-5">{item.username}</p>
			</div>
		</div>
	);
}

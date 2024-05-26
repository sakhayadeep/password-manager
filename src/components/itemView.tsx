"use client";
import { useState } from "react";
import { LoginObject } from "@/util/mongodb/loginObject.type";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon, ArrowLeft } from "./ui-elements/icons";

export default function ItemView({
	loginObject,
}: Readonly<{ loginObject: LoginObject }>) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="relative overflow-x-auto">
			<table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-12">
					<Link href="/dashboard" className="absolute inset-y-0 left-0">
						<button
							type="button"
							className="ml-1 mt-1 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
						>
							<ArrowLeft />
						</button>
					</Link>
					<tr>
						<th scope="col" colSpan={2} className="px-6 py-3 text-center">
							{loginObject?.website}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Username
						</th>
						<td className="px-6 py-4">
							<input
								type="text"
								className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={loginObject?.username}
							/>
						</td>
					</tr>
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Password
						</th>
						<td className="px-6 py-4">
							<div className="relative flex w-full rounded-md border-0 p-0 text-black shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
								<input
									type={showPassword ? "text" : "password"}
									value={loginObject?.password}
									className="w-full border-0 p-1.5 rounded-md"
								/>
								<button
									onClick={() => {
										setShowPassword((prev) => !prev);
									}}
									type="button"
									className="absolute inset-y-0 right-0 focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center dark:text-gray-900 dark:hover:text-blue-500 dark:focus:ring-blue-800 me-2"
								>
									{showPassword ? <EyeSlashIcon /> : <EyeIcon />}
									<span className="sr-only">show/hide password button</span>
								</button>
							</div>
						</td>
					</tr>
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Note
						</th>
						<td className="px-6 py-4">
							<textarea className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
								{loginObject?.note}
							</textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

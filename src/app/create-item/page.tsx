"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { handleFormSubmit } from "@/util/createItem/createItemUtil";
import { ToastMessage, ToastProps } from "@/components/ui-elements/toast";
import SubmitButton from "@/components/create-item/submitButton";

interface ToastMessageDetails extends ToastProps {
	show: boolean;
}

export default function CreateItem() {
	const websiteRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const noteRef = useRef<HTMLTextAreaElement>(null);
	const [toastMessageDetails, setToastMessageDetails] =
		useState<ToastMessageDetails>({
			show: false,
			type: "success",
			message: "",
			onClose: () => {
				setToastMessageDetails((prev) => ({
					...prev,
					show: false,
				}));
			},
		});

	const handleFormSubmitWrapper = async () => {
		const formData = {
			website: websiteRef?.current?.value,
			username: usernameRef?.current?.value,
			password: passwordRef?.current?.value,
			note: noteRef?.current?.value,
		};
		const result = await handleFormSubmit(formData);
		if (!result?.success) {
			setToastMessageDetails((prev) => ({
				...prev,
				show: true,
				type: "error",
				message: "Something went wrong. Failed to add item!",
			}));
		}
	};

	function checkURL(e: any) {
		let string = e.target.value;
		if (!~string.indexOf("https") && !~string.indexOf("http")) {
			string = "https://" + string;
			e.target.value = string;
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
						Create New Login Item
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action={handleFormSubmitWrapper}>
						<div>
							<label
								htmlFor="website"
								className="block text-sm font-medium leading-6 "
							>
								Website
							</label>
							<div className="mt-2">
								<input
									ref={websiteRef}
									onBlur={checkURL}
									id="website"
									name="website"
									type="url"
									required
									placeholder="https://example.com"
									className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 "
							>
								Username
							</label>
							<div className="mt-2">
								<input
									ref={usernameRef}
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									className="block w-full p-1.5 text-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 "
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									ref={passwordRef}
									id="password"
									name="password"
									type="text"
									autoComplete="current-password"
									required
									className="block w-full p-1.5 text-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="Note"
									className="block text-sm font-medium leading-6 "
								>
									Note
								</label>
							</div>
							<div className="mt-2">
								<textarea
									ref={noteRef}
									id="note"
									name="note"
									className="block w-full p-1.5 text-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<SubmitButton />
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						<Link
							href="/dashboard"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Go back to Dashboard
						</Link>
					</p>
				</div>
			</div>
			{toastMessageDetails.show && (
				<ToastMessage
					type={toastMessageDetails.type}
					message={toastMessageDetails.message}
					onClose={toastMessageDetails.onClose}
				/>
			)}
		</>
	);
}

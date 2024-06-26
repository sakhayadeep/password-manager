"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { LoginDocument } from "@/util/mongodb/loginObject.type";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon, ArrowLeft, Trash } from "./ui-elements/icons";
import {
	deleteItemHandler,
	updateItemHandler,
} from "@/util/login-item/loginItemUtil";
import { ToastMessage, ToastProps } from "./ui-elements/toast";
import { Modal } from "./ui-elements/modal";
import SaveButton from "./login-item/saveButton";

interface ItemViewProps {
	loginObject: LoginDocument;
}
interface ToastMessageDetails extends ToastProps {
	show: boolean;
}

export default function ItemView({ loginObject }: Readonly<ItemViewProps>) {
	const [showPassword, setShowPassword] = useState(false);
	const [initialFormValues, setInitialFormValues] = useState(loginObject || {});
	const [formValues, setFormValues] = useState(loginObject || {});
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [toastMessageDetails, setToastMessageDetails] =
		useState<ToastMessageDetails>({
			show: false,
			type: "success",
			message: "Item updated successfully!",
			onClose: () => {
				setToastMessageDetails((prev) => ({
					...prev,
					show: false,
				}));
			},
		});
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Function to handle form input changes
	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	// Effect to check if form values are changed
	useEffect(() => {
		const valuesChanged = (
			Object.keys(initialFormValues) as Array<keyof LoginDocument>
		).some((key) => formValues[key] !== initialFormValues[key]);
		setIsSaveButtonDisabled(!valuesChanged);
	}, [formValues, initialFormValues]);

	useEffect(() => {
		if (toastMessageDetails.show) {
			setTimeout(() => {
				toastMessageDetails.onClose();
			}, 3000);
		}
	}, [toastMessageDetails]);

	const deleteItemHandlerWrapper = async () => {
		const result = await deleteItemHandler(initialFormValues?._id);
		if (!result?.success) {
			setToastMessageDetails((prev) => ({
				...prev,
				show: true,
				type: "error",
				message: "Failed to delete item!",
			}));
		}
		setOpenDeleteModal(false);
	};
	const showDeleteModal = () => {
		setOpenDeleteModal(true);
	};
	const hideDeleteModal = () => {
		setOpenDeleteModal(false);
	};
	const updateItemHandlerWrapper = async () => {
		const result = await updateItemHandler(formValues);
		if (!result?.success) {
			setToastMessageDetails((prev) => ({
				...prev,
				show: true,
				type: "error",
				message: "Failed to updated item!",
			}));
		} else {
			setInitialFormValues(formValues);
			setToastMessageDetails((prev) => ({
				...prev,
				show: true,
				type: "success",
				message: "Item updated successfully!",
			}));
			setFormValues(result.updatedItem);
		}
	};

	return (
		<>
			<div className="relative overflow-x-auto">
				<table className="relative w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-min">
						<tr>
							<th scope="col" colSpan={2}>
								<div className="flex px-2 py-1 content-center items-center">
									<Link href="/dashboard" className="flex-none">
										<button
											type="button"
											className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
										>
											<ArrowLeft />
										</button>
									</Link>
									<p className="grow text-center">
										{loginObject?.website?.split("://")?.[1]}
									</p>
									<div className="flex flex-none gap-2">
										<button
											onClick={showDeleteModal}
											type="button"
											className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
										>
											<Trash />
										</button>
										<SaveButton
											isSaveButtonDisabled={isSaveButtonDisabled}
											onClickHandler={updateItemHandlerWrapper}
										/>
									</div>
								</div>
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
									name="username"
									value={formValues?.username}
									onChange={handleInputChange}
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
										name="password"
										value={formValues?.password}
										onChange={handleInputChange}
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
								<textarea
									name="note"
									onChange={handleInputChange}
									className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={formValues?.note}
								></textarea>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Created
							</th>
							<td className="px-6 py-4">
								<p>{new Date(formValues?.createdDate).toLocaleString()}</p>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Last updated
							</th>
							<td className="px-6 py-4">
								<p>{new Date(formValues?.lastUpdated).toLocaleString()}</p>
							</td>
						</tr>
					</tbody>
				</table>
				{toastMessageDetails.show && (
					<ToastMessage
						type={toastMessageDetails.type}
						message={toastMessageDetails.message}
						onClose={toastMessageDetails.onClose}
					/>
				)}
			</div>
			{openDeleteModal && (
				<Modal
					modalHeader="Confirm delete"
					modelContent="Delete this password?"
					primaryLabel="Delete"
					secondaryLabel="Cancel"
					primaryCallback={deleteItemHandlerWrapper}
					secondaryCallback={hideDeleteModal}
					onCloseCallback={hideDeleteModal}
				/>
			)}
		</>
	);
}

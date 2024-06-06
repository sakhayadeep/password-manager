"use client";

import { Loading, Save } from "@/components/ui-elements/icons";
import { useState } from "react";

export default function SaveButton({
	isSaveButtonDisabled,
	onClickHandler,
}: Readonly<SaveButtonPropsType>) {
	const [loading, setLoading] = useState<boolean>(false);
	const onClickHandlerWrapper = async () => {
		setLoading(true);
		await onClickHandler();
		setLoading(false);
	};
	return (
		<button
			disabled={isSaveButtonDisabled}
			hidden={isSaveButtonDisabled}
			onClick={onClickHandlerWrapper}
			type="button"
			className={`${
				isSaveButtonDisabled ? "cursor-not-allowed" : ""
			} text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800`}
		>
			{loading ? <Loading /> : <Save />}
		</button>
	);
}

type SaveButtonPropsType = {
	isSaveButtonDisabled: boolean;
	onClickHandler: () => Promise<void>;
};

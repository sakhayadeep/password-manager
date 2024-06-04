import { signOut } from "@/auth";
import { SignOut as SignOutIcon } from "@/components/ui-elements/icons";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button
				className="ml-1 mt-1 text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
				type="submit"
			>
				<SignOutIcon />
			</button>
		</form>
	);
}

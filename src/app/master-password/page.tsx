import PinInput from "@/components/master-password/pinInput";
import {
	checkMasterPasswordVerification,
	handleMasterPasswordSubmit,
	handleCreateMasterPassword,
	isMasterPasswordSet,
} from "@/util/master-password/util";

export default async function MasterPassword() {
	await checkMasterPasswordVerification();

	const masterPasswordSet = await isMasterPasswordSet();
	if (masterPasswordSet) {
		return (
			<div className="w-full min-h-screen flex justify-center">
				<form
					action={handleMasterPasswordSubmit}
					className="flex items-center justify-center"
				>
					<PinInput mode="verify" />
				</form>
			</div>
		);
	}

	return (
		<div className="w-full min-h-screen flex justify-center">
			<form
				action={handleCreateMasterPassword}
				className="flex items-center justify-center"
			>
				<PinInput mode="create" />
			</form>
		</div>
	);
}

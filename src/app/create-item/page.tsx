import CreateItem from "@/components/create-item/createItem";
import { isMasterPasswordVerified, loginIsRequired } from "@/util/sessionUtil";

export default async function CreateItemPage() {
	await loginIsRequired();
	isMasterPasswordVerified();
	return <CreateItem />;
}

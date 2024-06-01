import { getLoginObject } from "@/util/mongodb/connect";
import { loginIsRequired } from "@/util/sessionUtil";
import ItemView from "@/components/itemView";
import { LoginDocument } from "@/util/mongodb/loginObject.type";

export default async function Item({
	searchParams,
}: Readonly<{
	params?: any;
	searchParams?: any;
}>) {
	await loginIsRequired();
	const { q } = searchParams;
	const loginObjectId = decodeURIComponent(q);
	const loginObject = await getLoginObject(loginObjectId);

	return <ItemView loginObject={loginObject as LoginDocument} />;
}

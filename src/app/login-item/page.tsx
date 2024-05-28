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
	const user = await loginIsRequired();
	const { website, username } = searchParams;
	const loginObjectId = `${user.email}${website}${username}`;
	const loginObject = await getLoginObject(loginObjectId);

	return <ItemView loginObject={loginObject as LoginDocument} />;
}

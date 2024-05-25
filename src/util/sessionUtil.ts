import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function loginIsRequired() {
    const session = await auth();

	if (!session?.user) redirect("/account/login");
}

export async function alreadyLoggedIn() {
    const session = await auth();

	if (session?.user) redirect("/dashboard");
}


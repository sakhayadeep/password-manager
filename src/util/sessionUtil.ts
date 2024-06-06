import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cookies } from 'next/headers'
import { getDecryptedData } from './mongodb/encryption';

export function isMasterPasswordVerified(skipRedirect?: boolean) {
    const masterSession = cookies().get('master.session');
    let masterKeyVerified = false;
    try {
        if (masterSession) {
            const masterSessionValue = masterSession.value;
            const { iv, encryptedData } = JSON.parse(masterSessionValue);
            const sessionString = getDecryptedData({ iv, data: encryptedData });
            masterKeyVerified = sessionString === "masterKeyVerified";
        }
    } catch (err) {
        console.log(`Something went wrong trying to verify master session: ${err}\n`);
    }
    if (!masterKeyVerified && !skipRedirect) { redirect("/master-password"); }
    return masterKeyVerified;
}

export async function loginIsRequired() {
    const session = await auth();

    if (!session?.user) { redirect("/"); }

    return session.user;
}

export async function alreadyLoggedIn() {
    const session = await auth();

    if (!session?.user) { return; }

    isMasterPasswordVerified();

    redirect("/dashboard");
}


"use server";

import { getMasterPassword, createMasterPassword } from '../mongodb/connect';
import { getEncryptedData, getHashedData } from '../mongodb/encryption';
import { loginIsRequired, isMasterPasswordVerified } from '../sessionUtil';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export async function isMasterPasswordSet() {
    const { email } = await loginIsRequired();
    const userPassword = await getMasterPassword(email as string);
    return !!userPassword;
}

export async function checkMasterPasswordVerification() {
    await loginIsRequired();
    const masterKeyVerified = isMasterPasswordVerified(true);
    if (masterKeyVerified) { redirect("/dashboard"); }
}

function createMasterSessionCookie() {
    const encryptedSessionData = getEncryptedData("masterKeyVerified");
    cookies().set('master.session', JSON.stringify(encryptedSessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
        sameSite: "strict"
    });
}

export async function handleMasterPasswordSubmit(formData: FormData) {
    const password = Array.from(formData.values()).join('');
    const { email } = await loginIsRequired();
    const userPassword = await getMasterPassword(email as string);
    const hashedPassword = getHashedData(password);
    if (hashedPassword !== userPassword) {
        return false;
    }

    createMasterSessionCookie();

    redirect("/dashboard");
}

export async function handleCreateMasterPassword(formData: FormData) {
    const password = Array.from(formData.values()).join('');
    const { email } = await loginIsRequired();
    const { success } = await createMasterPassword({ password, appUserEmail: email as string });

    if (!success) {
        console.log("something went wrong!");
        return;
    }

    createMasterSessionCookie();

    redirect("/dashboard");
}
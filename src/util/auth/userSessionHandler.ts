"use server";

import { signIn, signOut } from "@/auth";
import { cookies } from 'next/headers';

export async function signInHandler() {
    await signIn("google", undefined, { prompt: "login" });
}

export async function signOutHandler() {
    cookies().delete('master.session');
    await signOut();
}
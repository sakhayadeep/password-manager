'use server';

import { LoginObject } from '../mongodb/loginObject.type';
import { loginIsRequired } from '../sessionUtil';
import { createLoginObject } from "@/util/mongodb/connect";
import { redirect } from "next/navigation";

export const handleFormSubmit = async function (formData: { [key: string]: any }) {
    const user = await loginIsRequired();

    const loginObject = {
        appUserEmail: user.email,
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        ...formData
    } as LoginObject;

    const result = await createLoginObject(loginObject);

    if (result?.success) {
        redirect("/dashboard");
    }
    return { success: false }
};
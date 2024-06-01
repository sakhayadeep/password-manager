'use server';

import { loginIsRequired } from '../sessionUtil';
import { deleteLoginObject, updateLoginObject } from "@/util/mongodb/connect";
import { redirect } from "next/navigation";
import { LoginDocument } from '../mongodb/loginObject.type';

export const deleteItemHandler = async (loginObjectId: string) => {
    await loginIsRequired();
    const result = await deleteLoginObject(loginObjectId);
    if (result?.success) {
        redirect("/dashboard");
    }
    return result;
};

export const updateItemHandler = async (formValues: LoginDocument) => {
    await loginIsRequired();
    const result = await updateLoginObject(formValues);
    return result;
};

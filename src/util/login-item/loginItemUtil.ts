'use server';

import { loginIsRequired } from '../sessionUtil';
import { deleteLoginObject } from "@/util/mongodb/connect";
import { redirect } from "next/navigation";

export const deleteItemHandler = async (loginObjectId: string) => {
    await loginIsRequired();
    const result = await deleteLoginObject(loginObjectId);
    if (result?.success) {
        redirect("/dashboard");
    }
    return result;
};

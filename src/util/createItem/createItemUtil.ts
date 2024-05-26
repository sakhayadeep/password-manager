'use server';

import { LoginObject } from '../mongodb/loginObject.type';
import { loginIsRequired } from '../sessionUtil';
import { createLoginObject } from "@/util/mongodb/connect";

export const handleFormSubmit = async function (params: { [key: string]: any }) {
    const user = await loginIsRequired();

    const loginObject = {
        appUserEmail: user.email,
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        ...params
    } as LoginObject;

    createLoginObject(loginObject);
};
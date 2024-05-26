'use server';

import { loginIsRequired } from '../sessionUtil';
import { getAllLoginObjects } from "@/util/mongodb/connect";

export const getLoginItems = async function () {
    const user = await loginIsRequired();

    const appUserEmail = user.email;

    const result = await getAllLoginObjects(appUserEmail as string);
    return result;
};
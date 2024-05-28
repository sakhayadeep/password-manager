'use server';

import { LoginItemsInterface } from '@/app/dashboard/dashboard.type';
import { LoginObject, LoginDocument } from './loginObject.type';
const { MongoClient, ServerApiVersion } = require('mongodb');
import { getEncryptedData, getDecryptedData, getHashedData } from './encryption';

const uri = process.env.MONGO_CONNECTION_STRING;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_COLLECTION;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let clientPromise: typeof MongoClient;

async function connectMongoClient() {
    if (!clientPromise) {
        clientPromise = await client.connect();
        console.log('connected to database.');
        return clientPromise;
    }
}

export async function createLoginObject(loginObject: LoginObject) {
    try {
        await connectMongoClient();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const { appUserEmail, website, username } = loginObject;
        const { iv: passwordIv, encryptedData: password } = getEncryptedData(loginObject.password);
        const { iv: noteIv, encryptedData: note } = getEncryptedData(loginObject.note);
        const documentId = getHashedData(`${appUserEmail}${website}${username}`);
        const loginItem = {
            _id: documentId,
            ...loginObject,
            passwordIv,
            password,
            noteIv,
            note,
        };

        const result = await collection.insertOne(loginItem);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        return { success: result?.acknowledged };
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        return { success: false };
    }
}

export async function getLoginObject(loginObjectId: string): Promise<LoginDocument | null> {
    try {
        await connectMongoClient();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const documentId = getHashedData(loginObjectId);
        const loginItem = await collection.findOne(
            { _id: documentId },
        );
        const password = getDecryptedData({
            data: loginItem.password,
            iv: loginItem.passwordIv
        });
        const note = getDecryptedData({
            data: loginItem.note,
            iv: loginItem.noteIv
        });
        const decryptedLoginItem = {
            ...loginItem,
            password,
            note,
        };
        delete decryptedLoginItem.passwordIv;
        delete decryptedLoginItem.noteIv;
        return decryptedLoginItem;
    } catch (err) {
        console.error(`Something went wrong trying to get the document: ${err}\n`);
        return null;
    }
}

export async function getAllLoginObjects(appUserEmail: string): Promise<LoginItemsInterface[]> {
    try {
        await connectMongoClient();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { appUserEmail };
        const cursor = await collection.find(
            query,
            {
                sort: { website: 1 },
                projection: { _id: 0, website: 1, username: 1 },
            }
        );
        const allLoginObjects = await cursor.toArray();
        return allLoginObjects;
    } catch (err) {
        console.error(`Something went wrong trying to get the documents: ${err}\n`);
        console.dir(err);
        return [];
    }
}

export async function updateLoginObject(loginObject: LoginObject) { }

export async function deleteLoginObject(loginObjectId: string) {
    try {
        await connectMongoClient();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const query = { _id: loginObjectId };
        const result = await collection.findOneAndDelete(query);
        if (result !== null) {
            return { success: true, message: "Successfully deleted one document." };
        } else {
            return { success: false, message: "No documents matched the query. Deleted 0 documents." };
        }
    } catch (err) {
        const errorMessage = `Something went wrong trying to delete the document: ${err}\n`;
        console.error(errorMessage);
        return { success: false, message: errorMessage };
    }
}

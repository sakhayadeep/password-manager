'use server';

import { LoginItemsInterface } from '@/app/dashboard/dashboard.type';
import { LoginObject } from './loginObject.type';

const { MongoClient, ServerApiVersion } = require('mongodb');
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

export async function createLoginObject(loginObject: LoginObject) {
    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const { appUserEmail, website, username } = loginObject;
        const loginItem = {
            _id: `${appUserEmail}${website}${username}`,
            ...loginObject
        };

        const result = await collection.insertOne(loginItem);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    } finally {
        await client.close();
    }
}

export async function getLoginObject(loginObjectId: string): Promise<LoginObject | null> {
    let loginItem;
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        loginItem = await collection.findOne(
            { _id: loginObjectId },
        );
    } catch (err) {
        console.error(`Something went wrong trying to get the document: ${err}\n`);
    } finally {
        await client.close();
    }
    return loginItem;
}

export async function getAllLoginObjects(appUserEmail: string): Promise<LoginItemsInterface[]> {
    let result;
    try {
        await client.connect();
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
        result = await cursor.toArray();
    } catch (err) {
        console.error(`Something went wrong trying to get the documents: ${err}\n`);
    } finally {
        await client.close();
    }
    return result;
}

export async function updateLoginObject(loginObject: LoginObject) { }

export async function deleteLoginObject(loginObject: LoginObject) { }

import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore, addDoc } from 'firebase/firestore/lite';

const FIREBASE_CFG = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
};

function dbInit() {
    const app = initializeApp(FIREBASE_CFG);
    const db = getFirestore(app);
    return db;
}

interface UserSchema {
    email: string,
    firstname: string,
    lastname: string
}

function mapToUser(data): UserSchema {
    return {
        email: ( data.email )? data.email:"",
        firstname: ( data.firstname )? data.firstname:"",
        lastname: ( data.lastname )? data.lastname:""
    };
}

async function getAll(db: Firestore) {
    const users = collection(db, 'users');
    const l = await getDocs(users);
    const ll = l.docs.map(doc => doc.data());
    return ll;
}


async function GETHandler(event: HandlerEvent): Promise<HandlerResponse> {
    const db = dbInit();
    if (event.body == undefined || event.body.length === 0) {
        return {
            statusCode: 400,
            body: "Error: Empty Body"
        };
    }
    const body = JSON.parse(event.body);
    const usersCollection = collection(db, 'users');
    const docs = (await getDocs(usersCollection)).docs.map((v) => v.data());
    return {
        statusCode: 200,
        headers: {
            ["Content-Type"]: "application/json"
        },
        body: JSON.stringify(docs)
    };
}

async function POSTHandler(event: HandlerEvent): Promise<HandlerResponse> {
    const db = dbInit();
    if (event.body == undefined || event.body.length === 0) {
        return {
            statusCode: 400,
            body: "Error: Empty Body"
        };
    }
    const body = mapToUser(JSON.parse(event.body));
    const usersCollection = collection(db, 'users');
    try {
        const doc = await addDoc(usersCollection, body);
        return {
            statusCode: 200,
            body: doc.path
        };
    }
    catch {
        return {
            statusCode: 400
        }
    }
}

export const handler: Handler = async (event, _) => {
    const contentType = event.headers['content-type'];
    if (contentType != "application/json") {
        return {
            statusCode: 400,
            body: "Error: Invalid Content-Type"
        }
    }

    switch (event.httpMethod.toUpperCase()) {
        case "GET":
            return await GETHandler(event);
        case "POST":
            return await POSTHandler(event);
        default:
            return {
                statusCode: 404
            }
    }
}


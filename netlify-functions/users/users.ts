import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions'
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc,
    QueryConstraint,
    orderBy,
    startAt,
    endAt,
    getDoc,
    updateDoc,
    doc
} from 'firebase/firestore/lite';

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

function getExactQueryFrom(data): [QueryConstraint] {
    let ret: QueryConstraint[] = [];
    for ( const i in data ) {
        const d = data[i] + "";
        if (d == "") {
            continue;
        }
        ret.push( where(i, "==", d) );
    }
    return ret as [QueryConstraint];
}

async function GETHandler(event: HandlerEvent): Promise<HandlerResponse> {
    const db = dbInit();
    const param = event.queryStringParameters;
    if (param == null) {
        return {
            statusCode: 400,
            body: "Error: Empty Params"
        };
    }
    const me = (param.me == "true")? true:false;
    const email = param.email;
    if (email == null && me) {
        return {
            statusCode: 400,
            body: "Error: Empty Email"
        };
    }
    // const body = JSON.parse(event.body);
    const usersCollection = collection(db, 'users');

    // if (param != "true") {
    //     const queries: QueryConstraint[] = [];
    //     if (body.startAt) {
    //         queries.push( orderBy(body.startAt) );
    //         queries.push( startAt(body[body.startAt]) );
    //         queries.push( endAt(body[body.startAt] + '\uf8ff') );
    //     }
    //     else {
    //         getExactQueryFrom(body).forEach((v) => {
    //             queries.push(v);
    //         });
    //     }
    //
    //     const docs = ( await getDocs( query(usersCollection, ...queries) ) )
    //                 .docs.map((v) => v.data());
    //     return {
    //         statusCode: 200,
    //         headers: {
    //             ["Content-Type"]: "application/json"
    //         },
    //         body: JSON.stringify(docs)
    //     };
    // }
    // else {
    const docs = ( await getDocs( query(usersCollection, where("email", "==", email)) ) )
                .docs[0];
    const resBody = (docs == undefined)? "User Does not exists":JSON.stringify( docs.data() );
    return {
        statusCode: (docs == undefined)? 400:200,
        headers: {
            ["Content-Type"]: "application/json"
        },
        body: resBody
    };
    // }
}

async function POSTHandler(event: HandlerEvent): Promise<HandlerResponse> {
    const db = dbInit();
    if (event.body == undefined || event.body.length === 0) {
        return {
            statusCode: 400,
            body: "Error: Empty Body"
        };
    }
    const param = event.queryStringParameters;
    let update = false;
    if (param != null) {
        update = (param.update == "true")? true:false;
    }

    const body = mapToUser(JSON.parse(event.body));
    const usersCollection = collection(db, 'users');
    try {
        const whereQ = where("email", "==", body.email);
        const res = (await getDocs( query(usersCollection, whereQ) ))
                .docs[0];
        if (res == undefined) {
            addDoc(usersCollection, body);
        }
        return {
            statusCode: 200,
        };
    }
    catch {
        return {
            statusCode: 500
        }
    }
}

async function PATCHHandler(event: HandlerEvent): Promise<HandlerResponse> {
    const db = dbInit();
    if (event.body == undefined || event.body.length === 0) {
        return {
            statusCode: 400,
            body: "Error: Empty Body"
        };
    }
    const body = JSON.parse(event.body);
    const email = body.email! as string;
    const update = body.update;
    // assume email always exists
    if (update == undefined) {
        return {
            statusCode: 200
        }
    }

    const usersCollection = collection(db, "users");
    const udoc = (await getDocs( query(usersCollection, where("email", "==", email)) )).docs[0];
    if (udoc == undefined) {
        return {
            statusCode: 400
        }
    }
    updateDoc(udoc.ref, update);
    return {
        statusCode: 200
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
        case "PATCH":
            return await PATCHHandler(event);
        default:
            return {
                statusCode: 404
            }
    }
}

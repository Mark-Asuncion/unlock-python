import { Handler, HandlerEvent } from '@netlify/functions'
import { dbInit } from '../database'

interface TutorialSchema {
    user: string,
    read: string[]
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

    const uid = param.uid;
    const tid = param.uid;

    // TODO if there is still time
    return {
        statusCode: 200
    }
}

export const handler: Handler = async (event, _) => {
    switch (event.httpMethod.toUpperCase()) {
        case "GET":
            return await GETHandler(event);
        default:
            return {
                statusCode: 404
            }
    }
}

import { APIGatewayProxyResult } from "aws-lambda";
import { JSONError } from "./Validators";
import { randomUUID } from "crypto"; // This is a built-in Node.js module

export function parseJSON(jsonString: string): any {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new JSONError('Failed to parse JSON data');
    }
}

export function createRandomId(): string {
    return randomUUID()
}

export function addCorsHeader(arg: APIGatewayProxyResult) {
    if (!arg.headers) {
        arg.headers = {}
    }
    arg.headers['Access-Control-Allow-Origin'] = '*';
    arg.headers['Access-Control-Allow-Methods'] = '*';
}
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
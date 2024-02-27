import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpaces";
import { deleteSpace } from "./DeleteSpaces";
import { MissingFieldError } from "../shared/Validators";

const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION
});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let message: string

    try {
        switch (event.httpMethod) {
            case "GET":
                const getResponse = await getSpaces(event, ddbClient);
                console.log({ getResponse });
                return getResponse;
            case "POST":
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
            case "PUT":
                const putResponse = await updateSpace(event, ddbClient);
                console.log(putResponse)
                return putResponse;
            case "DELETE":
                const deleteResponse = await deleteSpace(event, ddbClient);
                console.log(deleteResponse)
                return deleteResponse;
            default:
                break;
        }
    }
    catch (error) {
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        return {
            statusCode: 500,
            body: error.message
        }

    }
}

export { handler };

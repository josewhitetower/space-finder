import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpaces";

const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION
});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let message: string

    try {
        switch (event.httpMethod) {
            case "GET":
                message = "Hello from GET";
                break;
            case "POST":
                const response = postSpaces(event, ddbClient);
                return response;
            default:
                break;
        }
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }

    }
}

export { handler };

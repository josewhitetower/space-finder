import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";

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

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";

export async function getSpaces(
    event: APIGatewayProxyEvent,
    ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters) {
        if ('id' in event.queryStringParameters) {
            const id = event.queryStringParameters['id'];
            const result = await ddbClient.send(
                new GetItemCommand({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        id: { S: id }
                    },

                })
            )
            if (result.Item) {
                return { statusCode: 200, body: JSON.stringify(result.Item) };
            } else {
                return { statusCode: 404, body: JSON.stringify({ message: "Space not found" }) };
            }
        } else {
            return { statusCode: 401, body: JSON.stringify({ message: "Invalid query parameter" }) };
        }

    }

    const results = await ddbClient.send(
        new ScanCommand({
            TableName: process.env.TABLE_NAME,

        })
    );
    console.log({ results: results.Items.map((item) => ({ id: item.id.S, location: item.location.S })) });
    return { statusCode: 201, body: JSON.stringify(results.Items) };
}
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export async function postSpacesWithDoc(
    event: APIGatewayProxyEvent,
    ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    const randomId = v4();
    const item = JSON.parse(event.body);
    item.id = randomId;
    const ddbDocClient = DynamoDBDocumentClient.from(ddbClient); // Use the DynamoDBDocumentClient to simplify the PutItemCommand
    const result = await ddbDocClient.send(
        new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: item,
        })
    );
    console.log({ result });
    return { statusCode: 201, body: JSON.stringify({ id: randomId }) };
}
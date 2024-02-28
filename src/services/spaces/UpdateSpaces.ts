import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";



export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters) && event.body) {

        const parsedBody = JSON.parse(event.body);
        const spaceId = event.queryStringParameters['id'];
        const requestBodyKey = Object.keys(parsedBody)[0];
        const requestBodyValue = parsedBody[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': { S: spaceId }
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW' // return values of the updated item
        }));

        console.log({ updateResult: updateResult.Attributes });

        return {
            statusCode: 200,
            body: `Updated ${JSON.stringify(unmarshall(updateResult.Attributes))}`
        }

    }
    return {
        statusCode: 400,
        body: JSON.stringify(`Please provide right args!! ${event.queryStringParameters} ${event.body}`)
    }

}

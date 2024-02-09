import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({ })

async function handler(event: APIGatewayProxyEvent, context: Context) {
    const command = new ListBucketsCommand({})
    const listBucketsResult = (await s3Client.send(command)).Buckets
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello World! here your buckets: ${listBucketsResult.map(bucket => bucket.Name).join(", ")}`,
        }),
    };

    console.log({event})

    return response
}

export { handler }
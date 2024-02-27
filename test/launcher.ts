import { handler } from "../src/services/spaces/handler";

// "AWS_REGION": "eu-central-1",
// "TABLE_NAME": "SpacesTable-068cb2d50d41"
process.env.TABLE_NAME = "SpacesTable-068cb2d50d41";
process.env.AWS_REGION = "eu-central-1";

handler({
    httpMethod: "DELETE",
    queryStringParameters: {
        id: "433ffe9a-930e-40e0-b885-5d2189f55770"
    },
    // body: JSON.stringify({
    //     location: 'Hamburg Numberone',
    // })
} as any, {} as any);

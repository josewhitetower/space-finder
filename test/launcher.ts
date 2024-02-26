import { handler } from "../src/services/spaces/handler";

// "AWS_REGION": "eu-central-1",
// "TABLE_NAME": "SpacesTable-068cb2d50d41"
process.env.TABLE_NAME = "SpacesTable-068cb2d50d41";
process.env.AWS_REGION = "eu-central-1";

handler({
    httpMethod: "PUT",
    queryStringParameters: {
        id: "b6411436-c45b-4fd0-abfb-af45bfa0513e"
    },
    body: JSON.stringify({
        location: 'Hamburg Numberone',
    })
} as any, {} as any);

import { handler } from "../src/services/spaces/handler";

// "AWS_REGION": "eu-central-1",
// "TABLE_NAME": "SpacesTable-068cb2d50d41"
process.env.TABLE_NAME = "SpacesTable-068cb2d50d41";
process.env.AWS_REGION = "eu-central-1";

handler({
    httpMethod: 'DELETE',
    queryStringParameters: {
        id: '4d54949b-cddd-4c06-b148-fc837384d3ae'
    },
    // body: JSON.stringify({
    //     location: 'Munich updated'
    // })
} as any, {} as any).then(result => {
    console.log(result)
});

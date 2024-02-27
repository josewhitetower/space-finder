import { handler } from "../src/services/spaces/handler";

// "AWS_REGION": "eu-central-1",
// "TABLE_NAME": "SpacesTable-068cb2d50d41"
process.env.TABLE_NAME = "SpacesTable-068cb2d50d41";
process.env.AWS_REGION = "eu-central-1";

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'Dublin updated'
    })
} as any, {} as any).then(result => {
    console.log(result)
});

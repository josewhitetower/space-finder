import { fetchAuthSession, getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentity, fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";

import * as config from './../cdk-outputs.json'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: config.AuthStack.UserPoolId,
            userPoolClientId: config.AuthStack.SpaceUserPoolClientId,
            identityPoolId: config.AuthStack.SpaceIdentityPoolId,
        },
    }
})

export class AuthService {
    public async login(username: string, password: string) {
        const result = await signIn({
            username, password, options: {
                authFlowType: 'USER_PASSWORD_AUTH',
            }
        });
        const jwtToken = (await fetchAuthSession()).tokens.idToken.toString()
        return { result, jwtToken };
    }


    public async generateTemporaryCredentials(jwtToken: string) {
        const loginKey = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${config.AuthStack.UserPoolId}`;
        const credentials = fromCognitoIdentityPool({
            identityPoolId: config.AuthStack.SpaceIdentityPoolId,
            logins: {
                [loginKey]: jwtToken
            }
        });
        return credentials();

    }
}
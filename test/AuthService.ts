import { fetchAuthSession, getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentity, fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'eu-central-1_gis1IUKuD',
            userPoolClientId: 'iqaca37aersnimt07e7op2rqu',
            identityPoolId: 'eu-central-1:bf412efa-964b-4000-932b-60ee8573bf54'
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
        const credentials = fromCognitoIdentityPool({
            identityPoolId: 'eu-central-1:bf412efa-964b-4000-932b-60ee8573bf54',
            logins: {
                'cognito-idp.eu-central-1.amazonaws.com/eu-central-1_gis1IUKuD': jwtToken
            }
        });
        return credentials();

    }
}
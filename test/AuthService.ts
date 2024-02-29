import { fetchAuthSession, getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'eu-central-1_gis1IUKuD',
            userPoolClientId: 'iqaca37aersnimt07e7op2rqu',
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
}
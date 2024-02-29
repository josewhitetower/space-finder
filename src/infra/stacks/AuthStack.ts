import { Construct } from 'constructs'
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { CfnUserPoolGroup, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { CfnUserGroup } from 'aws-cdk-lib/aws-elasticache';


export class AuthStack extends Stack {
    public userPool: UserPool
    private userPoolClient: UserPoolClient

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this.createUserPool()
        this.createUserPoolClient()
        this.createAdminsGroup()

    }

    private createUserPool() {
        this.userPool = new UserPool(this, 'SpaceUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        })

        new CfnOutput(this, 'UserPoolId', {
            value: this.userPool.userPoolId
        })
    }
    private createUserPoolClient() {
        this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        })

        new CfnOutput(this, 'SpaceUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }

    private createAdminsGroup() {
        new CfnUserPoolGroup(this, 'SpacesAdmins', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'admins'
        })
    }
}
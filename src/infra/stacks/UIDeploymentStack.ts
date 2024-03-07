import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { OriginAccessIdentity, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";
import { getSuffixFromStack } from "../Utils";


export class UiDeploymentStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const uiDir = join(__dirname, '..', '..', '..', '..', 'space-finder-frontend', 'dist');

        if (existsSync(uiDir)) {
            const suffix = getSuffixFromStack(this);

            const deploymentBucket = new Bucket(this, 'uiDeploymentBucket', {
                bucketName: `space-finder-frontend-${suffix}`
            });
            new BucketDeployment(this, 'SpacesFinderDeployment', {
                destinationBucket: deploymentBucket,
                sources: [Source.asset(uiDir)]
            });

            const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
            deploymentBucket.grantRead(originIdentity);

            const distribution = new Distribution(this, 'SpacesFinderDistribution', {
                defaultRootObject: 'index.html',
                defaultBehavior: {
                    origin: new S3Origin(deploymentBucket, {
                        originAccessIdentity: originIdentity
                    })
                }
            });

            new CfnOutput(this, 'SpaceFinderUrl', {
                value: distribution.distributionDomainName
            })
        } else {
            console.warn('Ui directory not found: ' + uiDir)
            return
        }

    }
}
import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Architecture, Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class lambdaLayerStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdalayer = new LayerVersion(this, 'LambdaLayer', {
            layerVersionName: 'LayerForLambda',
            compatibleRuntimes: [
                Runtime.NODEJS_14_X
            ],
            //code: Code.fromBucket(Bucket.fromBucketArn(this, 'nodejs.zip',  cdk.Fn.importValue('S3forLambdaLayerArn')),'nodejs.zip'),
            code: Code.fromAsset('lambda-layer'),
            compatibleArchitectures: [
                Architecture.X86_64
            ]
        })

        new CfnOutput(this, "LambdaLayerArn", {
            value: lambdalayer.layerVersionArn,
            exportName: "LambdaLayerArn",
          });
    }
}

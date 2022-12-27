import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { CfnOutput, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3} from 'aws-cdk-lib';
import { aws_iam as iam} from 'aws-cdk-lib';

export class s3Stack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucketForLambdaLayer = new s3.Bucket(this,"bucket-for-lambda-layer", {
            bucketName: "bucket-for-lambda-layer",
            //blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        bucketForLambdaLayer.addToResourcePolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                principals: [new iam.AnyPrincipal()],
                actions: ["s3:*"],
                resources: [bucketForLambdaLayer.bucketArn],
            })
        );

        new s3deploy.BucketDeployment(this, "deploy-lambda-layer-bucket", {
            sources: [s3deploy.Source.asset('lambda-layer')],
            destinationBucket: bucketForLambdaLayer,
        });

        new CfnOutput(this, "S3forLambdaLayerArn", {
            value: bucketForLambdaLayer.bucketArn,
            exportName: "S3forLambdaLayerArn",
          });
    }
}

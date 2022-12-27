import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code, LayerVersion } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {LambdaIntegration, LambdaRestApi}  from 'aws-cdk-lib/aws-apigateway';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';

export class SkdAwsApigLmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'SkdAwsApigLmQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const computeEligFunction = new Function(this, "lambda-compute-elig", {
      functionName: 'Lambda-compute-eligibility',
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("build"),
      handler: "handler/lambda_compute_elig.computeEligibility",
      layers: [
          LayerVersion.fromLayerVersionArn(this, 'LambdaLayer', cdk.Fn.importValue('LambdaLayerArn'))
          //LayerVersion.fromLayerVersionArn(this, 'LambdaLayer', "give ARN of lambda layer")         
      ]
    })

/*    const eligibilityApi = new LambdaRestApi(this, 'eligibilityapi', {
      handler: computeEligFunction,
      proxy: false
    });

    const apis= eligibilityApi.root.addResource('apis');
    apis.addMethod('POST'); // POST /apis

    const api = apis.addResource('validate');
    api.addMethod('POST'); // POST /apis/{validate}
    */

    const eligibilityApi = new RestApi(this, "eligibilityapi");
    eligibilityApi.root
      .resourceForPath("eligibility")
      .addMethod("POST", new LambdaIntegration(computeEligFunction));
  }
}

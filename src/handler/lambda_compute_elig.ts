import 'source-map-support/register';
import log from 'lambda-log';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { error } from 'console';

export const computeEligibility = async(event: any) => {

    if(event.httpMethod !== 'POST') {
        throw new Error('unaccepted method attempted: ${event.httpMethod}');
    }
    try {
        const body = JSON.parse(event.body);
        log.info("printing event in computeEligibility handler fn :"+body);

        log.info("policy in the request :"+body.policynumber);
        log.info("payplan for the policy :"+body.payplan);

        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    } catch {
        log.error("Received Error :", error);
        throw error;
    }
};

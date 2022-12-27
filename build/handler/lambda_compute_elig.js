"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeEligibility = void 0;
require("source-map-support/register");
const lambda_log_1 = __importDefault(require("lambda-log"));
const console_1 = require("console");
exports.computeEligibility = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error('unaccepted method attempted: ${event.httpMethod}');
    }
    try {
        const body = JSON.parse(event.body);
        lambda_log_1.default.info("printing event in computeEligibility handler fn :" + body);
        lambda_log_1.default.info("policy in the request :" + body.policynumber);
        lambda_log_1.default.info("payplan for the policy :" + body.payplan);
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    }
    catch {
        lambda_log_1.default.error("Received Error :", console_1.error);
        throw console_1.error;
    }
};
//# sourceMappingURL=lambda_compute_elig.js.map
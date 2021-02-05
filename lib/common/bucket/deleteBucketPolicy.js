"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBucketPolicy = void 0;
const checkBucketName_1 = require("../utils/checkBucketName");
const _bucketRequestParams_1 = require("../client/_bucketRequestParams");
/**
 * deleteBucketPolicy
 * @param {String} bucketName - bucket name
 * @param {Object} options
 */
async function deleteBucketPolicy(bucketName, options = {}) {
    checkBucketName_1.checkBucketName(bucketName);
    const params = _bucketRequestParams_1._bucketRequestParams('DELETE', bucketName, 'policy', options);
    params.successStatuses = [204];
    const result = await this.request(params);
    return {
        status: result.status,
        res: result.res,
    };
}
exports.deleteBucketPolicy = deleteBucketPolicy;

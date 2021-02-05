"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucketInfo = void 0;
const checkBucketName_1 = require("../utils/checkBucketName");
const _bucketRequestParams_1 = require("../client/_bucketRequestParams");
async function getBucketInfo(name, options = {}) {
    checkBucketName_1.checkBucketName(name);
    name = name || this.options.bucket;
    const params = _bucketRequestParams_1._bucketRequestParams('GET', name, 'bucketInfo', options);
    params.successStatuses = [200];
    params.xmlResponse = true;
    const result = await this.request(params);
    return {
        bucket: result.data.Bucket,
        res: result.res,
    };
}
exports.getBucketInfo = getBucketInfo;

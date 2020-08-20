import { checkBucketName } from '../utils/checkBucketName';

/**
 * deleteBucketTags
 * @param {String} name - bucket name
 * @param {Object} options
 */

export async function deleteBucketTags(this: any, name: string, options: any = {}) {
  checkBucketName(name);

  const params = this._bucketRequestParams('DELETE', name, 'tagging', options);
  params.successStatuses = [204];
  const result = await this.request(params);

  return {
    status: result.status,
    res: result.res,
  };
}

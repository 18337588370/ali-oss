import { checkBucketName } from '../utils/checkBucketName';
import { RequestOptions } from '../../types/params';
import { GetBucketEncryptionReturnType } from '../../types/bucket';

/**
 * getBucketEncryption
 * @param {String} bucketName - bucket name
 */

export async function getBucketEncryption(
  this: any,
  bucketName: string,
  options: RequestOptions = {}
):Promise<GetBucketEncryptionReturnType> {
  checkBucketName(bucketName);
  const params = this._bucketRequestParams(
    'GET',
    bucketName,
    'encryption',
    options
  );
  params.successStatuses = [200];
  params.xmlResponse = true;
  const result = await this.request(params);
  const encryption = result.data.ApplyServerSideEncryptionByDefault;
  return {
    encryption,
    status: result.status,
    res: result.res,
  };
}

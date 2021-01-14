import { checkBucketName } from '../utils/checkBucketName';
import { RequestOptions } from '../../types/params';
import { GetBucketLoggingReturnType } from '../../types/bucket';

export async function getBucketLogging(
  this: any,
  name: string,
  options: RequestOptions = {}
):Promise<GetBucketLoggingReturnType> {
  checkBucketName(name);
  const params = this._bucketRequestParams('GET', name, 'logging', options);
  params.successStatuses = [200];
  params.xmlResponse = true;
  const result = await this.request(params);
  const enable = result.data.LoggingEnabled;
  return {
    enable: !!enable,
    prefix: (enable && enable.TargetPrefix) || null,
    res: result.res,
  };
}

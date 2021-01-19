import { checkBucketName } from '../utils/checkBucketName';
import { NormalSuccessResponseWithStatus, RequestOptions } from '../../types/params';

export async function completeBucketWorm(this: any, name: string, wormId: string, options: RequestOptions = {}): Promise<NormalSuccessResponseWithStatus> {
  checkBucketName(name);
  const params = this._bucketRequestParams('POST', name, { wormId }, options);

  const result = await this.request(params);
  return {
    res: result.res,
    status: result.status
  };
}

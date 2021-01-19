import { checkBucketName } from '../utils/checkBucketName';
import { NormalSuccessResponseWithStatus, RequestOptions } from '../../types/params';

export async function abortBucketWorm(this: any, name: string, options: RequestOptions = {}): Promise<NormalSuccessResponseWithStatus> {
  checkBucketName(name);
  const params = this._bucketRequestParams('DELETE', name, 'worm', options);

  const result = await this.request(params);
  return {
    res: result.res,
    status: result.status
  };
}

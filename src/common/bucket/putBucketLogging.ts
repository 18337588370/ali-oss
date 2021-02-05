import { checkBucketName } from '../utils/checkBucketName';
import { obj2xml } from '../utils/obj2xml';
import { NormalSuccessResponse, RequestOptions } from '../../types/params';
import { _bucketRequestParams } from '../client/_bucketRequestParams';
import { Client } from '../../setConfig';

export async function putBucketLogging(
  this: Client,
  name: string,
  prefix = '',
  options: RequestOptions = {}
): Promise<NormalSuccessResponse> {
  checkBucketName(name);
  const params = _bucketRequestParams('PUT', name, 'logging', options);
  const parseXMLObj = {
    BucketLoggingStatus: {
      LoggingEnabled: {
        TargetBucket: name,
        TargetPrefix: prefix,
      },
    },
  };

  params.content = obj2xml(parseXMLObj, { headers: true });
  params.mime = 'xml';
  params.successStatuses = [200];
  const result = await this.request(params);
  return {
    res: result.res,
  };
}

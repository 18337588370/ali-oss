import { checkBucketName } from '../utils/checkBucketName';
import { obj2xml } from '../utils/obj2xml';
import { RequestOptions, NormalSuccessResponse } from '../../types/params';
import { BucketCORSRule } from '../../types/bucket';

export async function putBucketCORS(
  this: any,
  name: string,
  rules: BucketCORSRule[] = [],
  options: RequestOptions = {}
):Promise<NormalSuccessResponse> {
  checkBucketName(name);
  if (!rules.length) {
    throw new Error('rules is required');
  }
  rules.forEach(rule => {
    if (!rule.allowedOrigin) {
      throw new Error('allowedOrigin is required');
    }

    if (!rule.allowedMethod) {
      throw new Error('allowedMethod is required');
    }
  });

  const params = this._bucketRequestParams('PUT', name, 'cors', options);
  const CORSRule = rules.map(_ => {
    const rule: any = {
      AllowedOrigin: _.allowedOrigin,
      AllowedMethod: _.allowedMethod,
      AllowedHeader: _.allowedHeader || '',
      ExposeHeader: _.exposeHeader || '',
    };
    if (_.maxAgeSeconds) rule.MaxAgeSeconds = _.maxAgeSeconds;

    return rule;
  });

  const parseXMLobj = {
    CORSConfiguration: {
      CORSRule,
    },
  };
  params.content = obj2xml(parseXMLobj, { headers: true });
  params.mime = 'xml';
  params.successStatuses = [200];
  const result = await this.request(params);
  return {
    res: result.res,
  };
}

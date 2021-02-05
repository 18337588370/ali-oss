import { checkBucketName } from '../utils/checkBucketName';
import { isArray } from '../utils/isArray';
import { formatObjKey } from '../utils/formatObjKey';
import { RequestOptions } from '../../types/params';
import { GetBucketLifecycleReturnType } from '../../types/bucket_lifecycle';
import { _bucketRequestParams } from '../client/_bucketRequestParams';
import { Client } from '../../setConfig';

export async function getBucketLifecycle(
  this: Client,
  name: string,
  options: RequestOptions = {}
): Promise<GetBucketLifecycleReturnType> {
  checkBucketName(name);
  const params = _bucketRequestParams('GET', name, 'lifecycle', options);
  params.successStatuses = [200];
  params.xmlResponse = true;
  const result = await this.request(params);
  let rules = result.data.Rule || null;
  if (rules) {
    if (!isArray(rules)) {
      rules = [rules];
    }
    rules = rules.map(_ => {
      if (_.ID) {
        _.id = _.ID;
        delete _.ID;
      }
      if (_.Tag && !isArray(_.Tag)) {
        _.Tag = [_.Tag];
      }
      return formatObjKey(_, 'firstLowerCase');
    });
  }
  return {
    rules,
    res: result.res,
  };
}

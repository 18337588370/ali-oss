import { isArray } from '../utils/isArray';
import { formatTag } from '../utils/formatTag';
import { RequestOptions } from '../../types/params';
import { ListBucketsQueryType, ListBucketsReturnType } from '../../types/bucket';
import { _bucketRequestParams } from '../client/_bucketRequestParams';
import { Client } from '../../setConfig';

export async function listBuckets(
  this: Client,
  query: ListBucketsQueryType = {},
  options: RequestOptions = {}
): Promise<ListBucketsReturnType> {
  // prefix, marker, max-keys
  const { subres = {} } = query;
  const restParams = {};
  for (const key in query) {
    if (key !== 'subres') {
      restParams[key] = query[key];
    }
  }
  const params: any = _bucketRequestParams(
    'GET',
    '',
    Object.assign(subres, options.subres),
    options
  );
  params.xmlResponse = true;
  params.query = restParams || {};

  const result = await this.request(params);

  if (result.status === 200) {
    const { data } = result;
    let buckets = data.Buckets || null;
    if (buckets) {
      if (buckets.Bucket) {
        buckets = buckets.Bucket;
      }
      if (!isArray(buckets)) {
        buckets = [buckets];
      }
      buckets = buckets.map(item => ({
        name: item.Name,
        region: item.Location,
        creationDate: item.CreationDate,
        storageClass: item.StorageClass,
        StorageClass: item.StorageClass,
        tag: formatTag(item),
      }));
    }
    return {
      buckets,
      owner: {
        id: data.Owner.ID,
        displayName: data.Owner.DisplayName,
      },
      isTruncated: data.IsTruncated === 'true',
      nextMarker: data.NextMarker || null,
      res: result.res,
    };
  }

  throw await this.requestError(result);
}

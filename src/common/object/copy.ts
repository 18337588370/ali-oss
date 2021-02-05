import { getSourceName } from '../utils/getSourceName';
import { convertMetaToHeaders } from '../utils/convertMetaToHeaders';
import { ObjectCopyOptions, ObjectCopyReturnType } from '../../types/object';
import { _objectRequestParams } from '../client/_objectRequestParams';
import { Client } from '../../setConfig';

const REPLACE_HEDERS = [
  'content-type',
  'content-encoding',
  'content-language',
  'content-disposition',
  'cache-control',
  'expires',
];

export async function copy(
  this: Client,
  name: string,
  sourceName: string,
  bucketName?: string | ObjectCopyOptions,
  options?: ObjectCopyOptions
): Promise<ObjectCopyReturnType> {
  if (typeof bucketName === 'object') {
    options = bucketName; // 兼容旧版本，旧版本第三个参数为options
  }
  options = options || {};
  options.headers = options.headers || {};

  Object.keys(options.headers).forEach(key => {
    options!.headers![`x-oss-copy-source-${key.toLowerCase()}`] =
      options!.headers![key];
  });
  if (options.meta || Object.keys(options.headers).find(_ => REPLACE_HEDERS.includes(_.toLowerCase()))) {
    options.headers['x-oss-metadata-directive'] = 'REPLACE';
  }
  convertMetaToHeaders(options.meta, options.headers);

  sourceName = getSourceName(sourceName, bucketName, this.options.bucket);

  if (options.versionId) {
    sourceName = `${sourceName}?versionId=${options.versionId}`;
  }

  options.headers['x-oss-copy-source'] = sourceName;

  const params = _objectRequestParams.call(this, 'PUT', name, options);
  params.xmlResponse = true;
  params.successStatuses = [200, 304];

  const result = await this.request(params);

  let { data } = result;
  if (data) {
    data = {
      etag: data.ETag,
      lastModified: data.LastModified,
    };
  }

  return {
    data,
    res: result.res,
  };
}

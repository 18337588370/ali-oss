import querystring from 'querystring';
import { Base64 } from 'js-base64';
import { checkBucketName as _checkBucketName } from '../utils/checkBucketName';
import { objectName } from '../utils/objectName';
import { _objectRequestParams } from '../client/_objectRequestParams';
import { Client } from '../../setConfig';

export async function processObjectSave(
  this: Client,
  sourceObject: string,
  targetObject: string,
  process: string,
  targetBucket: string
) {
  checkArgs(sourceObject, 'sourceObject');
  checkArgs(targetObject, 'targetObject');
  checkArgs(process, 'process');
  targetObject = objectName(targetObject);
  if (targetBucket) {
    _checkBucketName(targetBucket);
  }

  const params = _objectRequestParams.call(this, 'POST', sourceObject, {
    subres: 'x-oss-process',
  });

  const bucketParam = targetBucket ? `,b_${Base64.encode(targetBucket)}` : '';
  targetObject = Base64.encode(targetObject);

  const content = {
    'x-oss-process': `${process}|sys/saveas,o_${targetObject}${bucketParam}`,
  };
  params.content = querystring.stringify(content);

  const result = await this.request(params);
  return {
    res: result.res,
    status: result.res.status,
  };
}

function checkArgs(name: string, key: string) {
  if (!name) {
    throw new Error(`${key} is required`);
  }
  if (typeof name !== 'string') {
    throw new Error(`${key} must be String`);
  }
}

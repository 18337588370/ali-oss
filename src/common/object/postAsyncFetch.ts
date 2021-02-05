import { obj2xml } from '../utils/obj2xml';
import { objectName } from '../utils/objectName';
import { postAsyncFetchOptions } from '../../types/params';
import { _objectRequestParams } from '../client/_objectRequestParams';
import { Client } from '../../setConfig';

/*
 * postAsyncFetch
 * @param {String} name the object key
 * @param {String} url
 * @param {Object} options
 *        {String} options.host
 *        {String} options.contentMD5
 *        {String} options.callback
 *        {String} options.storageClass Standard/IA/Archive
 *        {Boolean} options.ignoreSameKey  default value true
 */
export async function postAsyncFetch(this: Client, object: string, url: string, options: postAsyncFetchOptions = {}): Promise<object> {
  options.subres = Object.assign({ asyncFetch: '' }, options.subres);
  options.headers = options.headers || {};
  object = objectName(object);

  const {
    host = '',
    contentMD5 = '',
    callback = '',
    storageClass = '',
    ignoreSameKey = true
  } = options;

  const paramXMLObj = {
    AsyncFetchTaskConfiguration: {
      Url: url,
      Object: object,
      Host: host,
      ContentMD5: contentMD5,
      Callback: callback,
      StorageClass: storageClass,
      IgnoreSameKey: ignoreSameKey
    }
  };

  const params = _objectRequestParams.call(this, 'POST', '', options);
  params.mime = 'xml';
  params.xmlResponse = true;
  params.successStatuses = [200];
  params.content = obj2xml(paramXMLObj);

  const result = await this.request(params);

  return {
    res: result.res,
    status: result.status,
    taskId: result.data.TaskId
  };
}


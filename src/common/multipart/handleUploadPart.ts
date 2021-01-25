import copy from 'copy-to';
import { Readable } from 'stream';
import { NormalSuccessResponse, RequestOptions } from '../../types/params';

const isReadableStreamLike = (stream): stream is Readable => {
  return stream && stream.pipe;
};

/**
 * Upload a part in a multipart upload transaction
 * @param {String} name the object name
 * @param {String} uploadId the upload id
 * @param {Integer} partNo the part number
 * @param {Object} data the body data
 * @param {Object} options
 */
export async function handleUploadPart(this: any, name: string, uploadId: string, partNo: number, data: { stream: Buffer | Readable | null, size: number }, options: RequestOptions = {}) {
  const opt: any = {};
  copy(options, false).to(opt);
  opt.headers = opt.headers || {};
  opt.headers['Content-Length'] = data.size;
  delete opt.headers['x-oss-server-side-encryption'];

  opt.subres = {
    partNumber: partNo,
    uploadId
  };
  const params = this._objectRequestParams('PUT', name, opt);
  params.mime = opt.mime;
  if (isReadableStreamLike(data.stream)) {
    params.stream = data.stream;
  } else {
    params.content = data.stream;
  }
  params.successStatuses = [200];

  const result: NormalSuccessResponse = await this.request(params);

  if (!result.res.headers.etag) {
    throw new Error('Please set the etag of expose-headers in OSS \n https://help.aliyun.com/document_detail/32069.html');
  }
  data.stream = null;
  params.stream = null;
  return {
    name,
    etag: result.res.headers.etag,
    res: result.res
  };
}

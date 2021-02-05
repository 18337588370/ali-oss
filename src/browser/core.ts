import { _unSupportBrowserTip } from '../common/utils/_unSupportBrowserTip';
import { Client } from '../setConfig';
import { IOptions } from '../types/params';
import { version } from './version';

// eslint-disable-next-line no-undef
(globalThis as any || window as any).process = require('../../shims/process');
// eslint-disable-next-line no-undef
(globalThis as any || window as any).Buffer = require('buffer').Buffer;

export {
  append,
  calculatePostSignature,
  copy,
  delete,
  deleteObject,
  deleteMulti,
  deleteObjectTagging,
  generateObjectUrl,
  get,
  getACL,
  getAsyncFetch,
  getBucketVersions,
  listObjectVersions,
  getObjectMeta,
  getObjectTagging,
  getObjectUrl,
  getSymlink,
  head,
  list,
  listV2,
  postAsyncFetch,
  putACL,
  putMeta,
  putObjectTagging,
  putSymlink,
  restore,
  signatureUrl,
} from '../common/object';

export {
  processObjectSave
} from '../common/image';

export {
  completeMultipartUpload,
  initMultipartUpload,
  listUploads,
  listParts,
  abortMultipartUpload,
  multipartUploadCopy,
  uploadPartCopy,
} from '../common/multipart';

export {
  abortBucketWorm,
  completeBucketWorm,
  deleteBucket,
  deleteBucketCORS,
  deleteBucketEncryption,
  deleteBucketInventory,
  deleteBucketLifecycle,
  deleteBucketLogging,
  deleteBucketPolicy,
  deleteBucketReferer,
  deleteBucketTags,
  deleteBucketWebsite,
  extendBucketWorm,
  getBucketACL,
  getBucketCORS,
  getBucketEncryption,
  getBucketInfo,
  getBucketInventory,
  getBucketLifecycle,
  getBucketLocation,
  getBucketLogging,
  getBucketPolicy,
  getBucketReferer,
  getBucketRequestPayment,
  getBucketTags,
  getBucketVersioning,
  getBucketWebsite,
  getBucketWorm,
  initiateBucketWorm,
  listBucketInventory,
  listBuckets,
  putBucket,
  putBucketACL,
  putBucketCORS,
  putBucketEncryption,
  putBucketInventory,
  putBucketLifecycle,
  putBucketLogging,
  putBucketPolicy,
  putBucketReferer,
  putBucketRequestPayment,
  putBucketTags,
  putBucketVersioning,
  putBucketWebsite,
} from '../common/bucket';

export {
  isCancel,
  resetCancelFlag,
  setBucket,
  useBucket,
  setSLDEnabled,
  signature,
} from '../common/client';

export {
  putStream,
  put
} from './object';

export {
  multipartUpload,
  uploadPart,
  cancel,
} from './multipart';

export class OSS extends Client {
  static urllib = require('../../shims/xhr');

  static version = version;

  constructor(props: IOptions, ctx?) {
    _unSupportBrowserTip();
    super(props, ctx);
  }
}

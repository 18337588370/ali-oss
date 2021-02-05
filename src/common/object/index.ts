export { append } from './append';
export { calculatePostSignature } from './calculatePostSignature';
export { copy } from './copy';
// 兼容旧版本 delete
export { deleteObject, deleteObject as delete } from './delete';
export { deleteMulti } from './deleteMulti';
export { deleteObjectTagging } from './deleteObjectTagging';
export { generateObjectUrl } from './generateObjectUrl';
export { get } from './get';
export { getACL } from './getACL';
export { getAsyncFetch } from './getAsyncFetch';
// 兼容旧版本 listObjectVersions
export { getBucketVersions, getBucketVersions as listObjectVersions } from './getBucketVersions';
export { getObjectMeta } from './getObjectMeta';
export { getObjectTagging } from './getObjectTagging';
export { getObjectUrl } from './getObjectUrl';
export { getSymlink } from './getSymlink';
export { head } from './head';
export { list } from './list';
export { listV2 } from './listV2';
export { postAsyncFetch } from './postAsyncFetch';
export { putACL } from './putACL';
export { putMeta } from './putMeta';
export { putObjectTagging } from './putObjectTagging';
export { putSymlink } from './putSymlink';
export { restore } from './restore';
export { signatureUrl } from './signatureUrl';

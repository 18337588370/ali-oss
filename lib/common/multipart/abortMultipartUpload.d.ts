/**
 * Abort a multipart upload transaction
 * @param {String} name the object name
 * @param {String} uploadId the upload id
 * @param {Object} options
 */
export declare function abortMultipartUpload(this: any, name: string, uploadId: string, options?: any): Promise<{
    res: any;
}>;

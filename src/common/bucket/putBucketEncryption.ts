import { checkBucketName } from '../utils/checkBucketName';
import { obj2xml } from '../utils/obj2xml';
import { PutBucketEncryptionOptions } from '../../types/bucket';
import { NormalSuccessResponseWithStatus } from '../../types/params';
import { _bucketRequestParams } from '../client/_bucketRequestParams';
import { Client } from '../../setConfig';
/**
 * putBucketEncryption
 * @param {String} bucketName - bucket name
 * @param {Object} options
 */

export async function putBucketEncryption(
  this: Client,
  bucketName: string,
  options: PutBucketEncryptionOptions
): Promise<NormalSuccessResponseWithStatus> {
  checkBucketName(bucketName);
  const params = _bucketRequestParams(
    'PUT',
    bucketName,
    'encryption',
    options
  );
  params.successStatuses = [200];
  const paramXMLObj: any = {
    ServerSideEncryptionRule: {
      ApplyServerSideEncryptionByDefault: {
        SSEAlgorithm: options.SSEAlgorithm,
      },
    },
  };
  if (options.SSEAlgorithm === 'KMS') {
    if (options.KMSDataEncryption !== undefined) {
      paramXMLObj.ServerSideEncryptionRule.ApplyServerSideEncryptionByDefault.KMSDataEncryption =
        options.KMSDataEncryption;
    }
    if (options.KMSMasterKeyID !== undefined) {
      paramXMLObj.ServerSideEncryptionRule.ApplyServerSideEncryptionByDefault.KMSMasterKeyID =
        options.KMSMasterKeyID;
    }
  }
  const paramXML = obj2xml(paramXMLObj, {
    headers: true,
  });
  params.mime = 'xml';
  params.content = paramXML;
  const result = await this.request(params);
  return {
    status: result.status,
    res: result.res,
  };
}
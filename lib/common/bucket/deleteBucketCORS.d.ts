import { NormalSuccessResponse, RequestOptions } from '../../types/params';
import { Client } from '../../setConfig';
export declare function deleteBucketCORS(this: Client, name: string, options?: RequestOptions): Promise<NormalSuccessResponse>;

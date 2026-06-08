import { ApiResponse } from '../types';
interface MetaDataInput {
    code?: number;
    message?: string;
    res_code?: string;
}
declare const responseApi: <T = any>(metaData?: MetaDataInput, data?: T) => ApiResponse<T>;
export default responseApi;
//# sourceMappingURL=response-api.d.ts.map
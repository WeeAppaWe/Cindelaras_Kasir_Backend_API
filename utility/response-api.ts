import { ApiResponse } from '../types';

interface MetaDataInput {
    code?: number;
    message?: string;
    res_code?: string;
}

const responseApi = <T = any>(metaData: MetaDataInput = {}, data: T = [] as any): ApiResponse<T> => {
    const { code = 500, message = 'Ok', res_code = '0001' } = metaData;

    let response: ApiResponse<T>;
    if (code === 200) {
        response = {
            response: data,
            metaData: {
                message: message,
                code: code,
                response_code: '0000'
            }
        };
    } else {
        response = {
            response: data,
            metaData: {
                message: message,
                code: code,
                response_code: res_code
            }
        };
    }

    return response;
};

export default responseApi;

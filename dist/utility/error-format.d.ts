interface SequelizeError extends Error {
    name: string;
    original?: {
        errno: number;
    };
    errors?: Array<{
        path: string;
        type: string;
        message: string;
    }>;
}
interface ErrorResponse {
    data: Array<{
        field: string;
        message: string;
    }>;
    metaData: {
        message: string;
        code: number;
        response_code: string;
    };
}
export declare const sequelizeDB: (error: SequelizeError) => Promise<ErrorResponse>;
declare const _default: {
    sequelizeDB: (error: SequelizeError) => Promise<ErrorResponse>;
};
export default _default;
//# sourceMappingURL=error-format.d.ts.map
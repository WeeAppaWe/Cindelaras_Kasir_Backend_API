export declare class PrismaErrorException extends Error {
    statusCode: number;
    code: string;
    response_code: string;
    metaData: any;
    constructor(error: any);
    private handleError;
    private handleKnownRequestError;
    private handleUnknownRequestError;
    private handleRustPanicError;
    private handleInitializationError;
    private handleValidationError;
}
//# sourceMappingURL=prisma-error.exception.d.ts.map
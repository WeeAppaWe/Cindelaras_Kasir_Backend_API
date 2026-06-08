import { Request, Response, NextFunction } from 'express';
export declare const urlValidation: (req: Request, res: Response, next: NextFunction) => void;
export declare const handleErrors: (err: Error, req: Request, res: Response, next: NextFunction) => Response;
export { ErrorNotFoundException } from './error-not-found.exception';
export { ErrorDataAlreadyExistException } from './error-data-already-exist.exception';
export { ErrorInvalidParameterException } from './error-invalid-parameter.exception';
export { ErrorCodeException } from './error-code.exception';
export { ErrorModelNotFoundException } from './error-model-not-found.exception';
export { ErrorModelDuplicateDataException } from './error-model-duplicate-data.exception';
export { ErrorQueryException } from './error-query.exception';
export { ErrorAuthenticationException } from './error-authentication.exception';
export { ErrorLimitException } from './error-limit.exception';
export { ErrorPreviousStageNotPassed } from './error-previous-stage-not-passed.exception';
export { ErrorSyncronization } from './error-syncronization.exception';
export { ErrorValidationException } from './error-validation.exception';
export { PrismaErrorException } from './prisma-error.exception';
//# sourceMappingURL=index.d.ts.map
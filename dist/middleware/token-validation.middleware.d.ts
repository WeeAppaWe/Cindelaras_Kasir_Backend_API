import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const tokenValidation: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const removeBearerPrefix: (tokenWithBearer: string) => string;
export default tokenValidation;
//# sourceMappingURL=token-validation.middleware.d.ts.map
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Upload Image
 * POST /api/upload/image
 */
export declare const uploadImage: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Image
 * DELETE /api/upload/image/:filename
 */
export declare const deleteImage: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    uploadImage: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteImage: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
//# sourceMappingURL=upload.controller.d.ts.map
import { Request, Response, NextFunction } from 'express';

// Extended Request interface for authenticated users
export interface AuthenticatedRequest extends Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    user?: {
        user_id: string;
        username: string;
        name: string;
        phone_number?: string | null;
        role: {
            role_id: string;
            name: string;
        };
        user_status: {
            user_status_id: string;
            name: string;
        };
        timezone?: string;
        utc_offset?: string;
        [key: string]: any;
    };
    datetime?: string;
}

// Response API format
export interface ApiResponse<T = any> {
    response: T;
    metaData: {
        message: string;
        code: number;
        response_code: string;
    };
}

// Pagination interface
export interface Pagination {
    limit: number;
    offset: number;
}

// Metadata info interface
export interface MetadataInfo {
    account_id: string | null;
    current_datetime: Date;
    timezone: string;
    utc_offset: string;
}

// Error data interface for exceptions
export interface ErrorData {
    [key: string]: any;
}

// Validation error item
export interface ValidationErrorItem {
    location: string;
    field: string;
    message: string;
}

// Express middleware type aliases
export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;
export type AsyncExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export type AuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export type AsyncAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;

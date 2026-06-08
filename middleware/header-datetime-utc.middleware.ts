import { Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AuthenticatedRequest } from '../types';

dayjs.extend(utc);

const headerDatetimeUtcMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        // set datetime UTC now
        req.datetime = dayjs.utc().format();

        next();
    } catch (error) {
        next(error);
    }
};

export default headerDatetimeUtcMiddleware;

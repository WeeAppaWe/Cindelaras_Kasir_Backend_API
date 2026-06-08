import { Pagination } from '../types';

export const getPagination = (pageNumber: number = 1, pageSize: number = 10): Pagination => {
    return {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize
    };
};

export default { getPagination };

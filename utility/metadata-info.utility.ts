import { AuthenticatedRequest, MetadataInfo } from '../types';

export const getMetadataInfo = (req: AuthenticatedRequest): MetadataInfo => {
    return {
        account_id: req.user?.user_id || null,      // ✅ Ambil dari req.user
        current_datetime: new Date(),
        timezone: req.user?.timezone || 'Asia/Jakarta',   // ✅ Ambil dari req.user
        utc_offset: req.user?.utc_offset || '+07:00'      // ✅ Ambil dari req.user
    };
};

export default { getMetadataInfo };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadataInfo = void 0;
const getMetadataInfo = (req) => {
    return {
        account_id: req.user?.user_id || null, // ✅ Ambil dari req.user
        current_datetime: new Date(),
        timezone: req.user?.timezone || 'Asia/Jakarta', // ✅ Ambil dari req.user
        utc_offset: req.user?.utc_offset || '+07:00' // ✅ Ambil dari req.user
    };
};
exports.getMetadataInfo = getMetadataInfo;
exports.default = { getMetadataInfo: exports.getMetadataInfo };
//# sourceMappingURL=metadata-info.utility.js.map
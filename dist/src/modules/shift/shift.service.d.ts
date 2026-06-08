import { AuthenticatedRequest } from '../../../types';
import { ShiftListResponse, ShiftWithUser, StartShiftResponse, EndShiftResponse, ActiveShiftResponse, ShiftSummary } from './shift.types';
export declare const getAll: (req: AuthenticatedRequest) => Promise<ShiftListResponse>;
export declare const getDetail: (req: AuthenticatedRequest) => Promise<ShiftWithUser>;
export declare const getActiveShift: (req: AuthenticatedRequest) => Promise<ActiveShiftResponse>;
/**
 * Buka shift baru untuk kasir
 *
 * Validasi:
 * - User harus terautentikasi
 * - Tidak boleh ada shift aktif yang belum ditutup
 */
export declare const startShift: (req: AuthenticatedRequest) => Promise<StartShiftResponse>;
/**
 * Tutup shift kasir
 *
 * Flow:
 * 1. Validasi ada shift aktif
 * 2. Cek tidak ada pesanan PENDING
 * 3. Hitung total penjualan (COMPLETED orders)
 * 4. Update shift dengan end_cash dan sold_total
 * 5. Return summary dengan selisih kas
 */
export declare const endShift: (req: AuthenticatedRequest) => Promise<EndShiftResponse>;
export declare const getShiftSummary: (req: AuthenticatedRequest) => Promise<ShiftSummary>;
export declare const getMyShifts: (req: AuthenticatedRequest) => Promise<ShiftListResponse>;
export declare const shiftService: {
    getAll: (req: AuthenticatedRequest) => Promise<ShiftListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<ShiftWithUser>;
    getActiveShift: (req: AuthenticatedRequest) => Promise<ActiveShiftResponse>;
    startShift: (req: AuthenticatedRequest) => Promise<StartShiftResponse>;
    endShift: (req: AuthenticatedRequest) => Promise<EndShiftResponse>;
    getShiftSummary: (req: AuthenticatedRequest) => Promise<ShiftSummary>;
    getMyShifts: (req: AuthenticatedRequest) => Promise<ShiftListResponse>;
};
export default shiftService;
//# sourceMappingURL=shift.service.d.ts.map
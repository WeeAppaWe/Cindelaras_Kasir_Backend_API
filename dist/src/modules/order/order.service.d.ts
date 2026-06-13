import { AuthenticatedRequest } from '../../../types';
import { OrderListResponse, OrderWithDetails, CreateOrderResponse, ConfirmPaymentResponse, CancelOrderResponse } from './order.types';
export declare const getAll: (req: AuthenticatedRequest) => Promise<OrderListResponse>;
export declare const getDetail: (req: AuthenticatedRequest) => Promise<OrderWithDetails>;
/**
 * Create order dari checkout kasir
 *
 * Flow:
 * 1. Validasi user terautentikasi
 * 2. Validasi ada shift aktif
 * 3. Validasi semua menu exist dan available
 * 4. Hitung total dari items
 * 5. Untuk CASH: validasi paid_amount >= total, hitung kembalian
 * 6. Untuk QRIS: status PENDING, paid_amount = total, change = 0
 * 7. Simpan order dengan items dalam transaction
 * 8. Kurangi stok bahan baku berdasarkan resep
 */
export declare const create: (req: AuthenticatedRequest) => Promise<CreateOrderResponse>;
/**
 * Konfirmasi pembayaran oleh kasir
 * - CASH: Wajib input paid_amount, hitung kembalian
 * - QRIS: paid_amount = total_amount, change = 0
 * Mengubah status dari PENDING ke COMPLETED
 * PENTING: Stock dikurangi di sini (bukan saat create order)
 */
export declare const confirmPayment: (req: AuthenticatedRequest) => Promise<ConfirmPaymentResponse>;
/**
 * Batalkan pesanan (hanya untuk PENDING)
 * Note: Tidak perlu mengembalikan stok karena stok belum dikurangi (hanya dikurangi saat confirm)
 */
export declare const cancelOrder: (req: AuthenticatedRequest) => Promise<CancelOrderResponse>;
/**
 * Generate receipt untuk order
 * Format: text (plain text) atau escpos (ESC/POS commands)
 */
export declare const getReceipt: (req: AuthenticatedRequest) => Promise<{
    format: string;
    content: string;
    data: {
        store_name: string;
        store_address: string;
        store_phone: string;
        store_logo: string;
        receipt_header: string;
        receipt_footer: string;
        order_id: string;
        receipt: string;
        order_date: string;
        order_time: string;
        cashier_name: string;
        customer_name: string;
        customer_phone: string;
        items: {
            name: string;
            qty: number;
            price: number;
            subtotal: number;
        }[];
        subtotal: number;
        total: number;
        payment_type: string;
        order_type: string;
        paid_amount: number;
        change_amount: number;
        status: string;
    };
}>;
export declare const orderService: {
    getAll: (req: AuthenticatedRequest) => Promise<OrderListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<OrderWithDetails>;
    create: (req: AuthenticatedRequest) => Promise<CreateOrderResponse>;
    confirmPayment: (req: AuthenticatedRequest) => Promise<ConfirmPaymentResponse>;
    cancelOrder: (req: AuthenticatedRequest) => Promise<CancelOrderResponse>;
    getReceipt: (req: AuthenticatedRequest) => Promise<{
        format: string;
        content: string;
        data: {
            store_name: string;
            store_address: string;
            store_phone: string;
            store_logo: string;
            receipt_header: string;
            receipt_footer: string;
            order_id: string;
            receipt: string;
            order_date: string;
            order_time: string;
            cashier_name: string;
            customer_name: string;
            customer_phone: string;
            items: {
                name: string;
                qty: number;
                price: number;
                subtotal: number;
            }[];
            subtotal: number;
            total: number;
            payment_type: string;
            order_type: string;
            paid_amount: number;
            change_amount: number;
            status: string;
        };
    }>;
};
export default orderService;
//# sourceMappingURL=order.service.d.ts.map
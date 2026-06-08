import { ReceiptOrderData } from './receipt.types';
/**
 * Find order by ID with all related data for receipt
 */
export declare const findOrderForReceipt: (orderId: string) => Promise<ReceiptOrderData | null>;
export declare const receiptRepository: {
    findOrderForReceipt: (orderId: string) => Promise<ReceiptOrderData | null>;
};
export default receiptRepository;
//# sourceMappingURL=receipt.repository.d.ts.map
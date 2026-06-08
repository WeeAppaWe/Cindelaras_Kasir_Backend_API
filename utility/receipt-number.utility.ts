const RECEIPT_PREFIX = 'STR';

const padTwoDigits = (value: number): string => value.toString().padStart(2, '0');

export const formatReceiptDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = padTwoDigits(date.getMonth() + 1);
    const day = padTwoDigits(date.getDate());

    return `${year}${month}${day}`;
};

export const generateReceiptNumber = (orderId: string, date: Date = new Date()): string => {
    const normalizedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const orderSuffix = normalizedOrderId.slice(-12);

    return `${RECEIPT_PREFIX}-${formatReceiptDate(date)}-${orderSuffix}`;
};

export default {
    generateReceiptNumber,
    formatReceiptDate,
};

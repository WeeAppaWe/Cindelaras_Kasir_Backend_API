"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_utility_1 = require("./receipt.utility");
// Mock pdfkit untuk menghindari PDF generation di unit test
jest.mock('pdfkit', () => {
    return jest.fn().mockImplementation(() => ({
        on: jest.fn(),
        fontSize: jest.fn().mockReturnThis(),
        font: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnThis(),
        moveDown: jest.fn().mockReturnThis(),
        end: jest.fn(),
        y: 0,
    }));
});
describe('Receipt Utility', () => {
    // Sample receipt data for testing
    const sampleReceiptData = {
        store_name: 'Toko Test',
        store_address: 'Jl. Test No. 123\nYogyakarta',
        store_phone: '0274-123456',
        store_logo: '/uploads/logo-test.png',
        receipt_header: 'Header Struk Test',
        receipt_footer: 'Footer Struk Test',
        order_id: '018f1f77-869f-7cc4-85e2-5f1fbc65a111',
        receipt: 'RCP-001',
        order_date: '2024-12-29',
        order_time: '14:30:00',
        cashier_name: 'Kasir Test',
        customer_name: 'Pelanggan Test',
        customer_phone: '08123456789',
        items: [
            { name: 'Nasi Goreng', qty: 2, price: 15000, subtotal: 30000 },
            { name: 'Es Teh', qty: 1, price: 5000, subtotal: 5000 },
        ],
        total: 35000,
        paid_amount: 50000,
        change_amount: 15000,
        payment_type: 'CASH',
    };
    // ============================================
    // GENERATE HTML RECEIPT TESTS
    // ============================================
    describe('generateHtmlReceipt', () => {
        it('should generate HTML with store name', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Toko Test');
        });
        it('should generate HTML with store address', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Jl. Test No. 123');
            expect(result).toContain('Yogyakarta');
        });
        it('should generate HTML with store phone and logo', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('0274-123456');
            expect(result).toContain('src="/uploads/logo-test.png"');
        });
        it('should generate HTML with receipt number', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('RCP-001');
        });
        it('should not display order ID', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).not.toContain('Order ID');
            expect(result).not.toContain('018f1f77-869f-7cc4-85e2-5f1fbc65a111');
        });
        it('should not use order ID as receipt number fallback', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)({
                ...sampleReceiptData,
                receipt: null,
            });
            expect(result).toContain('<strong>-</strong>');
            expect(result).not.toContain('65A111');
        });
        it('should generate HTML with receipt header and footer', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Header Struk Test');
            expect(result).toContain('Footer Struk Test');
        });
        it('should generate HTML with order date and time', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('2024-12-29');
            expect(result).toContain('14:30:00');
        });
        it('should generate HTML with cashier name', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Kasir Test');
        });
        it('should generate HTML with customer name', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Pelanggan Test');
        });
        it('should generate HTML with item names', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Nasi Goreng');
            expect(result).toContain('Es Teh');
        });
        it('should generate HTML with item quantities', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('2 x');
            expect(result).toContain('1 x');
        });
        it('should generate HTML with formatted prices', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            // Check for formatted money (may vary by locale)
            expect(result).toContain('Rp');
        });
        it('should generate HTML with total', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('TOTAL');
        });
        it('should generate HTML with payment type', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('CASH');
        });
        it('should generate HTML with change amount for CASH', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Kembalian');
        });
        it('should NOT show change for zero change amount', () => {
            const dataNoChange = {
                ...sampleReceiptData,
                change_amount: 0,
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataNoChange);
            expect(result).not.toContain('Kembalian');
        });
        it('should NOT show customer name when not provided', () => {
            const dataNoCustomer = {
                ...sampleReceiptData,
                customer_name: undefined,
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataNoCustomer);
            expect(result).not.toContain('Pelanggan:');
        });
        it('should generate valid HTML structure', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('<!DOCTYPE html>');
            expect(result).toContain('<html>');
            expect(result).toContain('</html>');
            expect(result).toContain('<head>');
            expect(result).toContain('</head>');
            expect(result).toContain('<body>');
            expect(result).toContain('</body>');
        });
        it('should include CSS styles', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('<style>');
            expect(result).toContain('</style>');
        });
        it('should include thank you message', () => {
            const result = (0, receipt_utility_1.generateHtmlReceipt)(sampleReceiptData);
            expect(result).toContain('Terima Kasih');
        });
        it('should handle QRIS payment type', () => {
            const dataQris = {
                ...sampleReceiptData,
                payment_type: 'QRIS',
                paid_amount: 35000,
                change_amount: 0,
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataQris);
            expect(result).toContain('QRIS');
        });
        it('should handle empty items array', () => {
            const dataNoItems = {
                ...sampleReceiptData,
                items: [],
                total: 0,
                paid_amount: 0,
                change_amount: 0,
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataNoItems);
            expect(result).toContain('<!DOCTYPE html>');
            // Should not throw error
        });
        it('should handle special characters in store name', () => {
            const dataSpecialChars = {
                ...sampleReceiptData,
                store_name: 'Toko & Warung <Test>',
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataSpecialChars);
            expect(result).toContain('Toko &amp; Warung &lt;Test&gt;');
        });
    });
    // ============================================
    // EDGE CASES
    // ============================================
    describe('Edge Cases', () => {
        it('should handle very long store name', () => {
            const dataLongName = {
                ...sampleReceiptData,
                store_name: 'A'.repeat(100),
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataLongName);
            expect(result).toContain('A'.repeat(100));
        });
        it('should handle very long item name', () => {
            const dataLongItem = {
                ...sampleReceiptData,
                items: [
                    { name: 'Menu dengan nama yang sangat panjang sekali', qty: 1, price: 10000, subtotal: 10000 },
                ],
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataLongItem);
            expect(result).toContain('Menu dengan nama yang sangat panjang sekali');
        });
        it('should handle large quantities', () => {
            const dataLargeQty = {
                ...sampleReceiptData,
                items: [
                    { name: 'Item Test', qty: 9999, price: 1000, subtotal: 9999000 },
                ],
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataLargeQty);
            expect(result).toContain('9999');
        });
        it('should handle large amounts', () => {
            const dataLargeAmount = {
                ...sampleReceiptData,
                total: 999999999,
                paid_amount: 1000000000,
                change_amount: 1,
            };
            const result = (0, receipt_utility_1.generateHtmlReceipt)(dataLargeAmount);
            expect(result).toContain('Rp');
        });
    });
});
//# sourceMappingURL=receipt.utility.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supplier_schema_1 = require("./supplier.schema");
const supplier_mock_1 = require("../../tests/mocks/supplier.mock");
// Use mock data from centralized mocks
const mockCreateRequest = supplier_mock_1.mockCreateSupplierData;
const mockUpdateRequest = supplier_mock_1.mockUpdateSupplierData;
describe('Supplier Schema Validation', () => {
    describe('createSupplierSchema', () => {
        it('should pass validation with valid complete data', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('PT Supplier Jaya');
                expect(result.data.phone).toBe('021-1234567');
                expect(result.data.address).toBe('Jl. Raya No. 123, Jakarta');
            }
        });
        it('should pass validation with minimal required data', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.validMinimal);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Toko Bahan Makanan');
            }
        });
        it('should fail validation with empty name', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.emptyName);
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
            }
        });
        it('should fail validation with short name (less than 2 chars)', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.shortName);
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal 2 karakter');
            }
        });
        it('should fail validation with name exceeding max length', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.longName);
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError?.message).toContain('maksimal');
            }
        });
        it('should fail validation with invalid phone format', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse(mockCreateRequest.invalidPhone);
            expect(result.success).toBe(false);
            if (!result.success) {
                const phoneError = result.error.issues.find((issue) => issue.path.includes('phone'));
                expect(phoneError).toBeDefined();
                expect(phoneError?.message).toContain('tidak valid');
            }
        });
        it('should accept valid phone formats', () => {
            const validPhones = [
                '021-1234567',
                '+62 812 3456 7890',
                '(021) 123456',
                '081234567890',
            ];
            validPhones.forEach((phone) => {
                const result = supplier_schema_1.createSupplierSchema.safeParse({
                    name: 'Test Supplier',
                    phone,
                });
                expect(result.success).toBe(true);
            });
        });
        it('should allow null phone', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse({
                name: 'Test Supplier',
                phone: null,
            });
            expect(result.success).toBe(true);
        });
        it('should allow null address', () => {
            const result = supplier_schema_1.createSupplierSchema.safeParse({
                name: 'Test Supplier',
                address: null,
            });
            expect(result.success).toBe(true);
        });
    });
    describe('updateSupplierSchema', () => {
        it('should pass validation with valid update data', () => {
            const result = supplier_schema_1.updateSupplierSchema.safeParse(mockUpdateRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('PT Supplier Makmur');
                expect(result.data.phone).toBe('022-7654321');
            }
        });
        it('should pass validation with partial update data', () => {
            const result = supplier_schema_1.updateSupplierSchema.safeParse(mockUpdateRequest.validPartial);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.phone).toBe('031-9999999');
            }
        });
        it('should pass validation with empty object (all fields optional)', () => {
            const result = supplier_schema_1.updateSupplierSchema.safeParse(mockUpdateRequest.emptyObject);
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid phone format', () => {
            const result = supplier_schema_1.updateSupplierSchema.safeParse(mockUpdateRequest.invalidPhone);
            expect(result.success).toBe(false);
        });
    });
    describe('supplierIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = supplier_schema_1.supplierIdParamSchema.safeParse({
                supplier_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid UUID format', () => {
            const result = supplier_schema_1.supplierIdParamSchema.safeParse({
                supplier_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('tidak valid');
            }
        });
        it('should fail validation with missing supplier_id', () => {
            const result = supplier_schema_1.supplierIdParamSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
    describe('supplierListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = supplier_schema_1.supplierListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'supplier',
            });
            expect(result.success).toBe(true);
        });
        it('should pass validation with empty query (all optional)', () => {
            const result = supplier_schema_1.supplierListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should coerce string numbers to numbers', () => {
            const result = supplier_schema_1.supplierListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });
        it('should fail validation with size exceeding max', () => {
            const result = supplier_schema_1.supplierListQuerySchema.safeParse({
                size: 101,
            });
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=supplier.schema.test.js.map
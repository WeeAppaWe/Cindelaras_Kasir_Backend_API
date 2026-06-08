import { spkConfigSchema } from './spk.schema';

describe('SPK Schemas', () => {
    // ============================================
    // SPK CONFIG SCHEMA TESTS
    // ============================================

    describe('spkConfigSchema', () => {
        it('should validate valid config with defaults', () => {
            const result = spkConfigSchema.safeParse({});
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.target_days).toBe(7);
                expect(result.data.buffer_percent).toBe(10);
                expect(result.data.lookback_days).toBe(30);
                expect(result.data.ingredient_type).toBe('all');
            }
        });

        it('should validate custom target_days', () => {
            const result = spkConfigSchema.safeParse({
                target_days: '14',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.target_days).toBe(14);
            }
        });

        it('should validate custom buffer_percent', () => {
            const result = spkConfigSchema.safeParse({
                buffer_percent: '20',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.buffer_percent).toBe(20);
            }
        });

        it('should validate custom lookback_days', () => {
            const result = spkConfigSchema.safeParse({
                lookback_days: '60',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.lookback_days).toBe(60);
            }
        });

        it('should validate ingredient_type filter (raw)', () => {
            const result = spkConfigSchema.safeParse({
                ingredient_type: 'raw',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.ingredient_type).toBe('raw');
            }
        });

        it('should validate ingredient_type filter (semi)', () => {
            const result = spkConfigSchema.safeParse({
                ingredient_type: 'semi',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.ingredient_type).toBe('semi');
            }
        });

        it('should validate valid supplier_id UUID', () => {
            const result = spkConfigSchema.safeParse({
                supplier_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should reject target_days below min (1)', () => {
            const result = spkConfigSchema.safeParse({
                target_days: '0',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('minimal 1');
            }
        });

        it('should reject target_days above max (90)', () => {
            const result = spkConfigSchema.safeParse({
                target_days: '100',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('maksimal 90');
            }
        });

        it('should reject negative buffer_percent', () => {
            const result = spkConfigSchema.safeParse({
                buffer_percent: '-5',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('tidak boleh negatif');
            }
        });

        it('should reject buffer_percent above max (100)', () => {
            const result = spkConfigSchema.safeParse({
                buffer_percent: '150',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('maksimal 100');
            }
        });

        it('should reject lookback_days below min (7)', () => {
            const result = spkConfigSchema.safeParse({
                lookback_days: '3',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('minimal 7');
            }
        });

        it('should reject lookback_days above max (90)', () => {
            const result = spkConfigSchema.safeParse({
                lookback_days: '120',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('maksimal 90');
            }
        });

        it('should reject invalid ingredient_type', () => {
            const result = spkConfigSchema.safeParse({
                ingredient_type: 'invalid',
            });
            expect(result.success).toBe(false);
        });

        it('should reject invalid supplier_id UUID', () => {
            const result = spkConfigSchema.safeParse({
                supplier_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('supplier_id tidak valid');
            }
        });
    });
});

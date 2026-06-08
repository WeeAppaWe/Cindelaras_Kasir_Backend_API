import { StockTypeData } from '../../modules/stock-type/stock-type.types';

export const mockStockType: StockTypeData = {
    stock_type_id: 'st-1',
    name: 'IN',
    created_at: new Date('2024-01-01T00:00:00.000Z'),
    updated_at: new Date('2024-01-01T00:00:00.000Z'),
};

export const mockStockTypes: StockTypeData[] = [
    mockStockType,
    {
        stock_type_id: 'st-2',
        name: 'OUT',
        created_at: new Date('2024-01-01T00:00:00.000Z'),
        updated_at: new Date('2024-01-01T00:00:00.000Z'),
    },
];

import { MenuData, MenuWithDetails } from '../../modules/menu/menu.types';
import { RecipeWithIngredient } from '../../modules/menu/recipe/menu-recipe.types';
export declare const mockMenu: MenuData;
export declare const mockMenu2: MenuData;
export declare const mockMenuInactive: MenuData;
export declare const mockMenuWithDetails: MenuWithDetails;
export declare const mockMenus: MenuData[];
export declare const mockIngredient: {
    ingredient_id: string;
    name: string;
    stock_qty: number;
    avg_cost: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredient2: {
    ingredient_id: string;
    name: string;
    stock_qty: number;
    avg_cost: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockRecipe: RecipeWithIngredient;
export declare const mockRecipe2: RecipeWithIngredient;
export declare const mockRecipes: RecipeWithIngredient[];
export declare const mockCreateMenuData: {
    valid: {
        name: string;
        category_id: string;
        price: number;
    };
    withOptionals: {
        name: string;
        category_id: string;
        price: number;
        description: string;
        image_url: string;
        is_available: boolean;
    };
};
export declare const mockUpdateMenuData: {
    valid: {
        name: string;
    };
    withPrice: {
        price: number;
    };
};
export declare const mockCreateRecipeData: {
    valid: {
        ingredient_id: string;
        qty_needed: number;
    };
};
export declare const mockBulkRecipeData: {
    valid: {
        recipes: {
            ingredient_id: string;
            qty_needed: number;
        }[];
    };
};
//# sourceMappingURL=menu.mock.d.ts.map
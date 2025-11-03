// src/context/ProductReducer.ts
import { type ProductState, type ProductAction } from './types';

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            // Đảm bảo không thay đổi state cũ (Immutability)
            return {
                ...state,
                products: [...state.products, action.payload]
            };

        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(p => 
                    p.id === action.payload.id ? action.payload : p
                )
            };
            
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload.id)
            };

        case 'SET_PRODUCTS':
            return { products: action.payload };
            
        default:
            return state;
    }
};
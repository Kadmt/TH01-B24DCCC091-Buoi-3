// src/context/types.ts

// 1. Kiểu Danh Mục
export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

// 2. Kiểu Sản Phẩm
export interface Product {
    id: number;
    ten: string;
    danhMuc: Category;
    gia: number;
    soLuong: number;
    moTa: string;
}

// 3. Kiểu State
export interface ProductState {
    products: Product[];
}

// 4. Kiểu Actions
export type ProductAction = 
    | { type: 'ADD_PRODUCT'; payload: Product }
    | { type: 'UPDATE_PRODUCT'; payload: Product }
    | { type: 'DELETE_PRODUCT'; payload: { id: number } }
    | { type: 'SET_PRODUCTS'; payload: Product[] }; // Dùng cho khởi tạo/API
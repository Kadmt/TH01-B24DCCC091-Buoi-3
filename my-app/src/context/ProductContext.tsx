// src/context/ProductContext.tsx
import React, { createContext, useReducer, useContext, type Dispatch, type ReactNode } from 'react';
import type { ProductState, ProductAction, Product } from './types';
import { productReducer } from './ProductReducer';

// Dữ liệu mẫu ban đầu (Yêu cầu 5.V)
const initialProducts: Product[] = [
    { id: 1, ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Chip A17 Bionic' },
    { id: 2, ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Vải cotton 100%' },
    { id: 3, ten: 'Sách Marketing', danhMuc: 'Sách', gia: 350000, soLuong: 5, moTa: 'Kiến thức cơ bản' },
    { id: 4, ten: 'Bánh Ngọt', danhMuc: 'Đồ ăn', gia: 45000, soLuong: 20, moTa: 'Bánh kem tươi' },
    { id: 5, ten: 'Quần Jeans Nữ', danhMuc: 'Quần áo', gia: 450000, soLuong: 30, moTa: 'Slim fit' },
    { id: 6, ten: 'Laptop Dell XPS', danhMuc: 'Điện tử', gia: 32000000, soLuong: 8, moTa: 'Màn hình 4K' },
    { id: 7, ten: 'Đồ Chơi Robot', danhMuc: 'Khác', gia: 500000, soLuong: 15, moTa: 'Lắp ráp' },
    { id: 8, ten: 'Nước Suối', danhMuc: 'Đồ ăn', gia: 10000, soLuong: 100, moTa: 'Nước khoáng' },
    { id: 9, ten: 'Tiểu Thuyết', danhMuc: 'Sách', gia: 120000, soLuong: 25, moTa: 'Trinh thám' },
    { id: 10, ten: 'Tai Nghe Sony', danhMuc: 'Điện tử', gia: 4000000, soLuong: 12, moTa: 'Chống ồn' },
];

const INITIAL_STATE: ProductState = {
    products: initialProducts,
};

// Định nghĩa Context
interface ProductContextType {
    state: ProductState;
    dispatch: Dispatch<ProductAction>;
}

// Khởi tạo Context với giá trị mặc định là null (vì nó sẽ được cung cấp sau)
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider Component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom Hook để sử dụng Context
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
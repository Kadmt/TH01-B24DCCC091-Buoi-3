// src/utils/validation.ts
import { type Product } from '../context/types';

export interface FormErrors {
    ten?: string;
    gia?: string;
    soLuong?: string;
    danhMuc?: string;
}

export const validateProduct = (product: Partial<Product>): FormErrors => {
    const errors: FormErrors = {};

    if (!product.ten || product.ten.length < 3) {
        errors.ten = 'Tên sản phẩm phải có tối thiểu 3 ký tự.';
    }

    if (!product.gia || product.gia <= 0) {
        errors.gia = 'Giá phải là một số dương.';
    }

    if (!product.soLuong || !Number.isInteger(product.soLuong) || product.soLuong <= 0) {
        errors.soLuong = 'Số lượng phải là một số nguyên dương.';
    }
    
    if (!product.danhMuc) {
        errors.danhMuc = 'Vui lòng chọn danh mục.';
    }

    return errors;
};
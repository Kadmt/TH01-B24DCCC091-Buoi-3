import React, { useState, useEffect } from 'react';
import type { Product, Category } from '../../context/types';
import { validateProduct, type FormErrors } from '../../validation/validation';
import './ProductForm.css'; // Import CSS riêng cho Form

// Định nghĩa Props cho ProductForm
interface ProductFormProps {
    initialProduct?: Product; 
    onSubmit: (productData: Omit<Product, 'id'>) => void; 
    submitButtonText: string;
}

const CATEGORIES: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const ProductForm: React.FC<ProductFormProps> = ({ 
    initialProduct, 
    onSubmit, 
    submitButtonText 
}) => {
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (initialProduct) {
            // Đảm bảo các giá trị số là kiểu Number
            setFormData({
                ...initialProduct,
                gia: Number(initialProduct.gia),
                soLuong: Number(initialProduct.soLuong)
            });
        }
    }, [initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        const finalValue = (name === 'gia' || name === 'soLuong') ? Number(value) : value;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
        
        // Xóa lỗi ngay khi người dùng gõ
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name as keyof FormErrors]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productToValidate: Partial<Product> = {
            ...formData,
            // Đảm bảo giá trị là số và tránh lỗi NaN
            gia: Number(formData.gia) || 0,
            soLuong: Number(formData.soLuong) || 0,
        };
        
        const validationErrors = validateProduct(productToValidate);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(productToValidate as Omit<Product, 'id'>);
    };

    // Hàm hiển thị lỗi
    const renderError = (key: keyof FormErrors) => {
        return errors[key] ? <span className="text-danger">{errors[key]}</span> : null;
    };

    return (
        <form onSubmit={handleSubmit} className="product-form border rounded">
            
            {/* Tên Sản Phẩm */}
            <div className="form-group">
                <label className="form-label">Tên Sản Phẩm:</label>
                <input 
                    type="text" 
                    name="ten" 
                    value={formData.ten || ''}
                    onChange={handleChange}
                    className="form-control"
                />
                {renderError('ten')}
            </div>

            {/* Danh Mục */}
            <div className="form-group">
                <label className="form-label">Danh Mục:</label>
                <select 
                    name="danhMuc" 
                    value={formData.danhMuc || ''}
                    onChange={handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                    className="form-select"
                >
                    <option value="">-- Chọn Danh Mục --</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {renderError('danhMuc')}
            </div>
            
            {/* Giá */}
            <div className="form-group">
                <label className="form-label">Giá:</label>
                <input 
                    type="number" 
                    name="gia" 
                    value={formData.gia || ''}
                    onChange={handleChange}
                    className="form-control"
                />
                {renderError('gia')}
            </div>

            {/* Số Lượng */}
            <div className="form-group">
                <label className="form-label">Số Lượng:</label>
                <input 
                    type="number" 
                    name="soLuong" 
                    value={formData.soLuong || ''}
                    onChange={handleChange}
                    className="form-control"
                />
                {renderError('soLuong')}
            </div>
            
            {/* Mô Tả */}
            <div className="form-group">
                <label className="form-label">Mô Tả:</label>
                <textarea 
                    name="moTa" 
                    value={formData.moTa || ''}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <button type="submit" className="btn btn-primary submit-button">
                {submitButtonText}
            </button>
        </form>
    );
};

export default ProductForm;
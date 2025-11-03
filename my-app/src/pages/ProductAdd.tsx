import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { useProduct } from '../context/ProductContext';
import { type Product } from '../context/types';

const ProductAdd: React.FC = () => {
    const { dispatch } = useProduct();
    const navigate = useNavigate();

    const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
        // Tạo ID mới (sử dụng timestamp hoặc logic tạo ID duy nhất)
        const newProduct: Product = {
            ...newProductData,
            id: Date.now(), // ID đơn giản
        };

        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        alert('Thêm sản phẩm thành công!');
        navigate('/'); // Điều hướng về trang chủ
    };

    return (
        <div className="p-4">
            <h2>➕ Thêm Sản Phẩm Mới</h2>
            <ProductForm 
                onSubmit={handleAddProduct} 
                submitButtonText="Thêm Sản Phẩm"
            />
        </div>
    );
};

export default ProductAdd;
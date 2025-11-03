import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { useProduct } from '../context/ProductContext';
import { type Product } from '../context/types';
import './ProductEdit.css';

const ProductEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    
    const { state, dispatch } = useProduct();
    const navigate = useNavigate();

    const currentProduct = useMemo(() => {
        return state.products.find(p => p.id === productId);
    }, [state.products, productId]);

    if (!currentProduct) {
        return <div className="alert alert-warning">Sản phẩm không tồn tại!</div>;
    }

    const handleUpdateProduct = (updatedData: Omit<Product, 'id'>) => {
        const updatedProduct: Product = {
            ...updatedData,
            id: productId, 
        };

        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        alert(`Cập nhật sản phẩm ${updatedProduct.ten} thành công!`);
        navigate(`/products/${productId}`); 
    };

    return (
        <div className="p-4">
            <h2>✏️ Chỉnh Sửa Sản Phẩm: {currentProduct.ten}</h2>
            <ProductForm 
                initialProduct={currentProduct} // Truyền dữ liệu hiện tại để điền vào form
                onSubmit={handleUpdateProduct} 
                submitButtonText="Cập Nhật Sản Phẩm"
            />
        </div>
    );
};

export default ProductEdit;
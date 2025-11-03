import React from 'react';
import { type Product } from '../../context/types';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Quan trọng: Đảm bảo import CSS

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        // Sử dụng các class tùy chỉnh (product-card) và class chung (border, rounded)
        <div className="product-card border rounded">
            <h5 className="card-title">{product.ten}</h5>
            
            <hr className="card-divider" /> 
            
            <p><strong>Giá:</strong> {product.gia.toLocaleString('vi-VN')} VND</p>
            <p><strong>Danh mục:</strong> {product.danhMuc}</p>
            <p><strong>Số lượng:</strong> {product.soLuong}</p>
            
            {/* Sử dụng class btn-detail tùy chỉnh hoặc btn-primary nếu đã định nghĩa */}
            <Link 
                to={`/products/${product.id}`} 
                className="btn btn-primary product-card-btn"
            >
                Xem chi tiết
            </Link>
        </div>
    );
};

export default ProductCard;
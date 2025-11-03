import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import './ProductDetail.css'; 

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Đảm bảo productId là một số hợp lệ
    const productId = Number(id); 
    
    const { state, dispatch } = useProduct();
    const navigate = useNavigate();

    // Tìm kiếm sản phẩm (sử dụng useMemo để tối ưu)
    const product = useMemo(() => {
        return state.products.find(p => p.id === productId);
    }, [state.products, productId]);

    // Xử lý Xóa sản phẩm
    const handleDelete = () => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product?.ten}" không?`)) {
            dispatch({ type: 'DELETE_PRODUCT', payload: { id: productId } });
            alert('Xóa sản phẩm thành công!');
            navigate('/'); // Quay về trang chủ
        }
    };

    if (!product) {
        return <div className="alert-warning product-detail-not-found">Sản phẩm không tồn tại.</div>;
    }

    return (
        // Sử dụng các class tùy chỉnh và cơ bản
        <div className="product-detail-container border rounded">
            <h1 className="detail-title">Chi Tiết Sản Phẩm: {product.ten}</h1>
            
            <div className="detail-table-wrapper">
                {/* Sử dụng cấu trúc table tùy chỉnh */}
                <table className="product-detail-table">
                    <tbody>
                        <tr><th>ID</th><td>{product.id}</td></tr>
                        <tr><th>Tên Sản Phẩm</th><td>{product.ten}</td></tr>
                        <tr><th>Danh Mục</th><td>{product.danhMuc}</td></tr>
                        <tr><th>Giá</th><td className="detail-price">{product.gia.toLocaleString('vi-VN')} VND</td></tr>
                        <tr><th>Số Lượng</th><td>{product.soLuong}</td></tr>
                        <tr className="detail-description-row">
                            <th>Mô Tả</th>
                            <td>{product.moTa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="detail-actions">
                <button 
                    onClick={() => navigate(`/edit/${product.id}`)} 
                    className="btn btn-warning action-button"
                >
                    ✏️ Sửa
                </button>
                <button 
                    onClick={handleDelete} 
                    className="btn btn-danger action-button"
                >
                    🗑️ Xóa
                </button>
                <button 
                    onClick={() => navigate('/')} 
                    className="btn btn-secondary action-button"
                >
                    ↩️ Quay lại
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
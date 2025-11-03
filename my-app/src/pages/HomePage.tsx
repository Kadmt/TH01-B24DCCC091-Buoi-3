import React, { useState, useMemo, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { type Category } from '../context/types';
import ProductCard from '../components/products/ProductCard';
import Pagination from '../components/common/Pagination';
import './HomePage.css'; // Import CSS riêng cho trang này

const PRODUCTS_PER_PAGE = 6;
const ALL_CATEGORIES: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const HomePage: React.FC = () => {
    const { state } = useProduct();
    const [searchText, setSearchText] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('Tất cả');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(Infinity);
    const [currentPage, setCurrentPage] = useState(1);

    // Tách logic reset trang về 1 khi các bộ lọc thay đổi
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchText, filterCategory, minPrice, maxPrice]);

    // Logic Lọc và Tìm kiếm
    const filteredProducts = useMemo(() => {
        return state.products
            .filter(p => {
                // ... (Logic filter giữ nguyên)
                if (filterCategory !== 'Tất cả' && p.danhMuc !== filterCategory) {
                    return false;
                }
                if (searchText.trim() !== '' && !p.ten.toLowerCase().includes(searchText.toLowerCase())) {
                    return false;
                }
                if (p.gia < minPrice || p.gia > maxPrice) {
                    return false;
                }
                return true;
            });
    }, [state.products, searchText, filterCategory, minPrice, maxPrice]);

    // Logic Phân Trang
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    // Kiểm tra tính hợp lệ của currentPage sau khi lọc (quan trọng!)
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);


    return (
        <div className="home-page">
            <h1 className="page-title">Danh Sách Sản Phẩm</h1>

            {/* Thanh Tìm Kiếm và Bộ Lọc */}
            <div className="filter-controls-group border rounded">
                
                {/* Tìm kiếm theo tên (real-time search) */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="form-control filter-input"
                />

                {/* Lọc theo danh mục */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="form-select filter-select"
                >
                    <option value="Tất cả">-- Lọc Danh Mục --</option>
                    {ALL_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Lọc theo khoảng giá (Min Price) */}
                <input
                    type="number"
                    placeholder="Giá tối thiểu"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="form-control filter-input"
                />

                {/* Lọc theo khoảng giá (Max Price) */}
                <input
                    type="number"
                    placeholder="Giá tối đa"
                    value={maxPrice === Infinity ? '' : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
                    className="form-control filter-input"
                />
            </div>
            
            {/* Danh Sách Sản Phẩm */}
            <div className="product-list-grid">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map(product => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <div className="no-products-found">
                        <p className="alert-info">Không tìm thấy sản phẩm nào.</p>
                    </div>
                )}
            </div>

            {/* Phân Trang */}
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default HomePage;
// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
// Import các Pages
import HomePage from './pages/HomePage';
import ProductAdd from './pages/ProductAdd';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';
import { ProductProvider } from './context/ProductContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ProductProvider> {/* Bọc toàn bộ ứng dụng bằng Provider */}
      <Header />
      <main className="app-container">
        <Routes>
          {/* Route '/': Trang chủ (Danh sách, tìm kiếm, lọc, phân trang) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route '/add': Thêm sản phẩm */}
          <Route path="/add" element={<ProductAdd />} />
          
          {/* Route '/products/:id': Chi tiết sản phẩm */}
          <Route path="/products/:id" element={<ProductDetail />} />
          
          {/* Route '/edit/:id': Chỉnh sửa sản phẩm */}
          <Route path="/edit/:id" element={<ProductEdit />} />
          
          {/* 404 Route */}
          <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
        </Routes>
      </main>
    </ProductProvider>
  );
};

export default App;
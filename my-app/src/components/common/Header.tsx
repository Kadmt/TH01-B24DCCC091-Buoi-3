import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; 

const Header: React.FC = () => {
    // Định nghĩa class cho NavLink dựa trên trạng thái hoạt động (isActive)
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? 'nav-link active-link' : 'nav-link';

    return (
        <header className="product-manager-header">
            <div className="logo">
                <NavLink to="/">
                    Quản Lý Sản Phẩm
                </NavLink>
            </div>
            <nav className="navigation">
                <ul>
                    <li>
                        {/* Trang chủ: Hiển thị danh sách sản phẩm */}
                        <NavLink to="/" className={getNavLinkClass}>
                            Danh Sách Sản Phẩm
                        </NavLink>
                    </li>
                    <li>
                        {/* Trang thêm sản phẩm: Form thêm sản phẩm mới */}
                        <NavLink to="/add" className={getNavLinkClass}>
                            Thêm Sản Phẩm
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
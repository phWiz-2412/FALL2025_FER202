import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline'
};

function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" end style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Trang Chủ
      </NavLink>
      {' | '}
      <NavLink to="/san-pham" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Sản Phẩm
      </NavLink>
      {' | '}
      <NavLink to="/lien-he" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Liên Hệ
      </NavLink>
    </nav>
  );
}

export default Navbar;

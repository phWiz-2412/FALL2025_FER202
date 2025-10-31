import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="*" element={<h2>404 - Trang không tìm thấy</h2>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

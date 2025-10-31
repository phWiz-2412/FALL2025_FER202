import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 101, name: 'Sản phẩm A' },
  { id: 102, name: 'Sản phẩm B' },
  { id: 103, name: 'Sản phẩm C' },
];

export default function Products() {
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/san-pham/${p.id}`}>{p.name} (ID: {p.id})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

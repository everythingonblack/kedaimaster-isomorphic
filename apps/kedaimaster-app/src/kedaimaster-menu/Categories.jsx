// src/components/Categories.jsx
import React from 'react';

const Categories = () => {
  return (
    <section className="categories">
      <a href="#" className="category-item">
        <div className="category-icon icon-semua" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/82/82226.png')" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/82/82226.png" style={{ width: '50%', height: '50%' }} />
        </div>
        <span>semua</span>
      </a>
      <a href="#" className="category-item">
        <div className="category-icon icon-coffe"></div>
        <span>coffee</span>
      </a>
      <a href="#" className="category-item">
        <div className="category-icon icon-drink"></div>
        <span>drink</span>
      </a>
      <a href="#" className="category-item">
        <div className="category-icon icon-snack"></div>
        <span>snack</span>
      </a>
    </section>
  );
};

export default Categories;
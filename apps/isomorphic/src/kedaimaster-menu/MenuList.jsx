// src/components/MenuList.jsx
import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, cart, onAddToCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
    <section className="menu-section">
      <h2 className="section-title">Coffee</h2>
      <div className="menu-list">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            cartItem={cart[item.id]}
            onAddToCart={onAddToCart}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuList;
// src/components/MenuList.jsx
import React from 'react';
import styles from './page.module.css';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, cart, onAddToCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
    <section className={styles.menuSection}>
      <h2 className={styles.sectionTitle}>Coffee</h2>
      <div className={styles.menuList}>
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
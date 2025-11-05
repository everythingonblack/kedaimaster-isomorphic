// src/components/MenuList.jsx
import React from 'react';
import styles from './page.module.css';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, cart, onAddToCart, onIncreaseQuantity, onDecreaseQuantity, activeCategory }) => {
  const filteredMenuItems = activeCategory === 'semua'
    ? menuItems
    : menuItems.filter(category => category.categoryId === activeCategory);

  return (
    <div className={styles.menuListContainer}>
      {filteredMenuItems.map((category) => (
        <section key={category.categoryId} className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>{category.categoryName}</h2>
          <div className={styles.menuList}>
            {category.items && category.items.length > 0 ? (
              category.items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  cartItem={cart[item.id]}
                  onAddToCart={onAddToCart}
                  onIncreaseQuantity={onIncreaseQuantity}
                  onDecreaseQuantity={onDecreaseQuantity}
                />
              ))
            ) : (
              <p className={styles.emptyText}>Tidak ada produk di kategori ini.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuList;

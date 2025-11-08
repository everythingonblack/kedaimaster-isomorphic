// src/components/MenuList.jsx
import React, { useMemo } from 'react';
import styles from './page.module.css';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, cart, onAddToCart, onIncreaseQuantity, onDecreaseQuantity, activeCategory }) => {
  // filter and sort menu items and their items
  const filteredMenuItems = useMemo(() => {
    let items = activeCategory === 'semua'
      ? menuItems
      : menuItems.filter(category => category.categoryId === activeCategory);

    // sort categories alphabetically
    const sortedCategories = [...items].sort((a, b) =>
      a.categoryName.localeCompare(b.categoryName, undefined, { sensitivity: 'base' })
    );

    // sort items within each category alphabetically
    return sortedCategories.map(category => ({
      ...category,
      items: category.items ? [...category.items].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      ) : [],
    }));
  }, [menuItems, activeCategory]);

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

// src/components/MenuItem.jsx
import React from 'react';
import styles from './page.module.css';

const MenuItem = ({ item, cartItem, onAddToCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
    <div className={styles.menuItem} key={item.id}>
      <div className={styles.menuItemContent}>
        <img src={item.image} alt={item.name} />
        <div className={styles.menuItemDetails}>
          <h3>{item.name}</h3>
          <p className={styles.menuItemPrice}>Rp {item.price.toLocaleString('id-ID')}</p>
        </div>
        {cartItem ? (
          <div style={{  display: 'flex', minWidth: '100px', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              className={styles.orderButton}
              onClick={() => onDecreaseQuantity(item.id)}
              style={{ padding: '8px 12px', width: '36px', borderRadius: '50%' }}
            >-</button>
            <p className={styles.menuItemPrice} style={{ margin: 0 }}>{cartItem.quantity}</p>
            <button
              className={styles.orderButton}
              onClick={() => onIncreaseQuantity(item.id)}
              style={{ padding: '8px 12px', width: '36px', borderRadius: '50%' }}
            >+</button>
          </div>
        ) : (
          <button className={styles.orderButton} onClick={() => onAddToCart(item)}>Pesan</button>
        )}
      </div>
      {item.description && <p className={styles.menuItemDescription}>{item.description}</p>}
    </div>
  );
};

export default MenuItem;
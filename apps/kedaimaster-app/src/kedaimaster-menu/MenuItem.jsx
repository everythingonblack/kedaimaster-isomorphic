// src/components/MenuItem.jsx
import React from 'react';

const MenuItem = ({ item, cartItem, onAddToCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
    <div className="menu-item" key={item.id}>
      <div className="menu-item-content">
        <img src={item.image} alt={item.name} />
        <div className="menu-item-details">
          <h3>{item.name}</h3>
          <p className="menu-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
        </div>
        {cartItem ? (
          <div className="quantity-control" style={{ display: 'flex', minWidth: '100px', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="order-button" onClick={() => onDecreaseQuantity(item.id)} style={{ padding: '8px 12px', width: '36px', borderRadius: '50%' }}>-</button>
            <p className="menu-item-price" style={{ margin: 0 }}>{cartItem.quantity}</p>
            <button className="order-button" onClick={() => onIncreaseQuantity(item.id)} style={{ padding: '8px 12px', width: '36px', borderRadius: '50%' }}>+</button>
          </div>
        ) : (
          <button className="order-button" onClick={() => onAddToCart(item)}>Pesan</button>
        )}
      </div>
      {item.description && <p className="menu-item-description">{item.description}</p>}
    </div>
  );
};

export default MenuItem;